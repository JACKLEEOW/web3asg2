/**
 * shadcn/ui-style chart primitives (ChartContainer, ChartStyle, Tooltip).
 * @see https://ui.shadcn.com/docs/components/chart
 */
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "../../lib/utils.js";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

export function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={cn(
                    "flex aspect-square max-h-[360px] w-full justify-center text-xs [&_.recharts-polar-angle-axis-tick_text]:fill-[var(--muted)] [&_.recharts-polar-grid]:stroke-[var(--border)] [&_.recharts-polar-radius-axis-tick_text]:fill-[var(--muted)] [&_.recharts-surface]:outline-none",
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});
ChartContainer.displayName = "Chart";

function ChartStyle({ id, config }) {
    const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color);

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
    .map(([key, itemConfig]) => {
        const color =
            itemConfig.theme?.[theme] || itemConfig.color;
        return color ? `  --color-${key}: ${color};` : null;
    })
    .filter(Boolean)
    .join("\n")}
}
`
                    )
                    .join("\n"),
            }}
        />
    );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export const ChartTooltipContent = React.forwardRef(
    ({ active, payload, className, hideLabel, label, labelFormatter, labelClassName }, ref) => {
        const { config } = useChart();

        const tooltipLabel = React.useMemo(() => {
            if (hideLabel || !payload?.length) {
                return null;
            }
            const [item] = payload;
            const key = `${item?.dataKey || item?.name || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const value =
                typeof label === "string" ? config[label]?.label || label : itemConfig?.label;

            if (labelFormatter) {
                return (
                    <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
                );
            }
            if (!value) {
                return null;
            }
            return <div className={cn("font-medium", labelClassName)}>{value}</div>;
        }, [label, labelFormatter, payload, hideLabel, labelClassName, config]);

        if (!active || !payload?.length) {
            return null;
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
                    className
                )}
                style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                    color: "var(--text)",
                }}
            >
                {tooltipLabel}
                <div className="grid gap-1.5">
                    {payload
                        .filter((item) => item.type !== "none")
                        .map((item) => {
                            const key = `${item.name || item.dataKey || "value"}`;
                            const itemConfig = getPayloadConfigFromPayload(config, item, key);
                            const indicatorColor = item.payload?.fill || item.color;

                            return (
                                <div key={item.dataKey} className="flex w-full flex-wrap items-center gap-2">
                                    <div
                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                        style={{
                                            backgroundColor: indicatorColor,
                                        }}
                                    />
                                    <div className="flex flex-1 justify-between leading-none">
                                        <span style={{ color: "var(--muted)" }}>
                                            {itemConfig?.label || item.name}
                                        </span>
                                        {item.value != null && (
                                            <span
                                                className="font-mono font-medium tabular-nums"
                                                style={{ color: "var(--text-h)" }}
                                            >
                                                {Number(item.value).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
);
ChartTooltipContent.displayName = "ChartTooltip";

function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }

    const payloadPayload =
        "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
            ? payload.payload
            : undefined;

    let configLabelKey = key;

    if (key in payload && typeof payload[key] === "string") {
        configLabelKey = payload[key];
    } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key] === "string"
    ) {
        configLabelKey = payloadPayload[key];
    }

    return configLabelKey in config ? config[configLabelKey] : config[key];
}

export { ChartContainer, ChartStyle };
