import { normalizeAudioFeature } from "../utils/relatedSongs.js";

const AXES = [
    { key: "energy", label: "Energy", get: (s) => normalizeAudioFeature(s?.energy) },
    { key: "danceability", label: "Danceability", get: (s) => normalizeAudioFeature(s?.danceability) },
    { key: "liveness", label: "Liveness", get: (s) => normalizeAudioFeature(s?.liveness) },
    { key: "valence", label: "Valence", get: (s) => normalizeAudioFeature(s?.valence) },
    { key: "acousticness", label: "Acousticness", get: (s) => normalizeAudioFeature(s?.acousticness) },
    { key: "speechiness", label: "Speechiness", get: (s) => normalizeAudioFeature(s?.speechiness) },
    { key: "loudness", label: "Loudness", get: (s) => normalizeAudioFeature(s?.loudness) },
];

function point(angle, radius) {
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

const SongAnalyticsRadar = ({ song, size = 300 }) => {
    const n = AXES.length;
    const maxR = 42;
    const pad = 52;
    const vb = maxR + pad;
    const values = AXES.map((a) => Math.min(1, Math.max(0, a.get(song))));

    const angles = Array.from({ length: n }, (_, i) => -Math.PI / 2 + (2 * Math.PI * i) / n);

    const ringLevels = [0.25, 0.5, 0.75, 1];
    const rings = ringLevels.map((t) => ({
        t,
        pts: angles.map((ang) => point(ang, maxR * t).join(",")).join(" "),
    }));

    const dataPoly = angles
        .map((ang, i) => {
            const r = maxR * values[i];
            return point(ang, r).join(",");
        })
        .join(" ");

    const labels = angles.map((ang, i) => {
        const [x, y] = point(ang, maxR + 22);
        return { x, y, text: AXES[i].label };
    });

    const summary = AXES.map((a, i) => `${a.label} ${(values[i] * 100).toFixed(0)}%`).join(", ");

    return (
        <figure className="flex flex-col items-center gap-3">
            <svg
                width={size}
                height={size}
                viewBox={`-${vb} -${vb} ${vb * 2} ${vb * 2}`}
                role="img"
                aria-label={`Audio features radar: ${summary}`}
            >
                <title>Audio features radar</title>
                {rings.map((r) => (
                    <polygon
                        key={r.t}
                        points={r.pts}
                        fill="none"
                        stroke="var(--border)"
                        strokeWidth="0.35"
                        opacity={0.85}
                    />
                ))}
                {angles.map((ang, i) => {
                    const [x, y] = point(ang, maxR);
                    return (
                        <line
                            key={i}
                            x1="0"
                            y1="0"
                            x2={x}
                            y2={y}
                            stroke="var(--border)"
                            strokeWidth="0.35"
                            opacity={0.75}
                        />
                    );
                })}
                <polygon
                    points={dataPoly}
                    fill="var(--accent)"
                    fillOpacity={0.22}
                    stroke="var(--accent)"
                    strokeWidth="0.9"
                    strokeLinejoin="round"
                />
                {labels.map((L, i) => (
                    <text
                        key={L.text}
                        x={L.x}
                        y={L.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="select-none"
                        style={{
                            fill: "var(--muted)",
                            fontSize: "6.5px",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                        }}
                    >
                        {L.text}
                    </text>
                ))}
            </svg>
        </figure>
    );
};

export default SongAnalyticsRadar;
