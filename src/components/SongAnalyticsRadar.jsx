import { useMemo } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart.jsx";

const METRICS = [
    { key: "energy", label: "Energy" },
    { key: "danceability", label: "Danceability" },
    { key: "liveness", label: "Liveness" },
    { key: "valence", label: "Valence" },
    { key: "acousticness", label: "Acousticness" },
    { key: "speechiness", label: "Speechiness" },
    { key: "loudness", label: "Loudness" },
];

const chartConfig = {
    value: {
        label: "Score (0–100)",
        color: "#bde6fb",
    },
};

function buildChartData(song) {
    return METRICS.map(({ key, label }) => ({
        metric: label,
        value: Math.min(100, Math.max(0, Number(song?.[key]) || 0)),
    }));
}

const SongAnalyticsRadar = ({ song }) => {
    const chartData = useMemo(() => buildChartData(song), [song]);

    return (
        <figure className="flex w-full max-w-md flex-col items-center gap-3">
            <ChartContainer
                config={chartConfig}
                className="mx-auto w-full max-w-[min(100%,380px)] overflow-visible [&_.recharts-responsive-container]:overflow-visible [&_.recharts-wrapper]:overflow-visible"
            >
                <RadarChart
                    data={chartData}
                    outerRadius="68%"
                    margin={{ top: 28, right: 40, bottom: 28, left: 48 }}
                >
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis
                        dataKey="metric"
                        tickLine={false}
                        tick={{ fontSize: 10 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tickCount={5}
                        tick={false}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Radar
                        name="Score"
                        dataKey="value"
                        stroke="var(--color-value)"
                        fill="var(--color-value)"
                        fillOpacity={0}
                        strokeWidth={2}
                        dot={false}
                    />
                </RadarChart>
            </ChartContainer>
            <figcaption className="max-w-md text-center text-xs" style={{ color: "var(--muted)" }}>
                shadcn-style radar (Recharts): outline only, 0–100 scores per axis.
            </figcaption>
        </figure>
    );
};

export default SongAnalyticsRadar;
