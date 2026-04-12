/** All audio analytics in the DB are 0–100; map to 0–1 for charts and similarity. */
export function normalizeAudioFeature(raw) {
    const v = Number(raw);
    if (!Number.isFinite(v)) return 0;
    return Math.min(1, Math.max(0, v / 100));
}

/**
 * Dimensions used for “top analytic categories” and related-song scoring.
 * Each entry: stable key + getter returning ~0–1.
 */
export const ANALYTIC_DIMENSIONS = [
    { key: "energy", label: "Energy", get: (s) => normalizeAudioFeature(s.energy) },
    { key: "danceability", label: "Danceability", get: (s) => normalizeAudioFeature(s.danceability) },
    { key: "liveness", label: "Liveness", get: (s) => normalizeAudioFeature(s.liveness) },
    { key: "valence", label: "Valence", get: (s) => normalizeAudioFeature(s.valence) },
    { key: "acousticness", label: "Acousticness", get: (s) => normalizeAudioFeature(s.acousticness) },
    { key: "speechiness", label: "Speechiness", get: (s) => normalizeAudioFeature(s.speechiness) },
    { key: "loudnessNorm", label: "Loudness", get: (s) => normalizeAudioFeature(s.loudness) },
];

/**
 * Songs whose sum of the current song’s top-3 analytic dimensions is closest to this song’s sum on those same dimensions.
 * @param {object} currentSong
 * @param {object[]} allSongs includes current; it will be excluded
 * @param {{ limit?: number }} opts
 */
export function findRelatedSongsByTopAnalytics(currentSong, allSongs, { limit = 10 } = {}) {
    const ranked = ANALYTIC_DIMENSIONS.map((d) => ({
        key: d.key,
        get: d.get,
        v: d.get(currentSong),
    })).sort((a, b) => b.v - a.v);

    const top3 = ranked.slice(0, 3);
    const targetSum = top3.reduce((s, d) => s + d.v, 0);

    return (allSongs || [])
        .filter((s) => s.song_id !== currentSong.song_id)
        .map((song) => {
            let sum = 0;
            for (const d of top3) {
                sum += d.get(song);
            }
            return { song, diff: Math.abs(targetSum - sum) };
        })
        .sort((a, b) => a.diff - b.diff || a.song.title.localeCompare(b.song.title))
        .slice(0, limit)
        .map((x) => x.song);
}

export function getTopAnalyticLabels(currentSong, count = 3) {
    return ANALYTIC_DIMENSIONS.map((d) => ({ label: d.label, v: d.get(currentSong) }))
        .sort((a, b) => b.v - a.v)
        .slice(0, count)
        .map((x) => x.label);
}
