import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SongAnalyticsRadar from "../components/SongAnalyticsRadar.jsx";
import PlaylistBadge from "../components/PlaylistBadge.jsx";
import AudioLevelLoader from "../components/AudioLevelLoader.jsx";
import { useToast } from "../components/Toast/ToastProvider.jsx";
import { withMinDelay } from "../utils/withMinDelay.js";
import { getSongById, getAllSongs } from "../api/songs.js";
import { addSongToPlaylist } from "../api/playlists.js";
import { findRelatedSongsByTopAnalytics, getTopAnalyticLabels } from "../utils/relatedSongs.js";

/** DB may store duration in ms (large) or seconds (small integer). */
function formatSongDuration(raw) {
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) return "—";
    const sec = n > 2000 ? Math.floor(n / 1000) : Math.floor(n);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

const Stat = ({ label, value, sub }) => (
    <div
        className="rounded-lg px-4 py-3"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
            {label}
        </p>
        <p className="mt-1 text-lg font-bold tabular-nums" style={{ color: "var(--text-h)" }}>
            {value}
        </p>
        {sub && (
            <p className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>
                {sub}
            </p>
        )}
    </div>
);

const SingleSongView = ({ selectedPlaylist, refreshPlaylistSongs }) => {
    const { showToast } = useToast();
    const { songId: songIdParam } = useParams();
    const [song, setSong] = useState(null);
    const [allSongs, setAllSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const songId = songIdParam ? parseInt(songIdParam, 10) : NaN;

    useEffect(() => {
        if (!songIdParam || Number.isNaN(songId)) {
            setLoading(false);
            setError(true);
            return;
        }
        setLoading(true);
        withMinDelay(Promise.all([getSongById(songId), getAllSongs()]))
            .then(([one, all]) => {
                setSong(one);
                setAllSongs(all);
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [songId, songIdParam]);

    const related = useMemo(() => {
        if (!song || !allSongs.length) return [];
        return findRelatedSongsByTopAnalytics(song, allSongs, { limit: 8 });
    }, [song, allSongs]);

    const topLabels = useMemo(() => (song ? getTopAnalyticLabels(song, 3) : []), [song]);

    const handleAddSong = async (id) => {
        if (!selectedPlaylist) {
            showToast("Select a playlist first in the Playlists view.", "error");
            return;
        }
        try {
            await addSongToPlaylist(selectedPlaylist.playlist_id, id);
            await refreshPlaylistSongs();
            showToast(`Added to "${selectedPlaylist.playlist_name}"`, "success");
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    if (!songIdParam || Number.isNaN(songId)) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center" style={{ background: "var(--bg)" }}>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                    Invalid song URL.
                </p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center" style={{ background: "var(--bg)" }}>
                <AudioLevelLoader label="Loading song" />
            </div>
        );
    }

    if (error || !song) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center" style={{ background: "var(--bg)" }}>
                <p className="text-red-400">Something went wrong.</p>
            </div>
        );
    }

    const img = song.artists?.artist_image_url;
    const loudnessRaw = Number(song.loudness);
    const loudnessDisplay = Number.isFinite(loudnessRaw) ? String(Math.round(loudnessRaw)) : "—";

    return (
        <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
            <div
                style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
                className="flex flex-col gap-8 px-8 py-10 md:flex-row md:items-end"
            >
                <img
                    src={img}
                    alt=""
                    className="h-48 w-48 shrink-0 rounded-md object-cover shadow-lg md:h-56 md:w-56"
                    style={{ border: "1px solid var(--border)" }}
                    onError={(e) => {
                        e.target.src = "https://placehold.co/400x400/171d20/6d8692?text=♪";
                    }}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-3 pb-0.5">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                        Song
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: "var(--text-h)" }}>
                        {song.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" style={{ color: "var(--text)" }}>
                        <Link
                            to={`/artists/${song.artists?.artist_id}`}
                            className="font-semibold underline-offset-2 hover:underline"
                            style={{ color: "var(--text-h)" }}
                        >
                            {song.artists?.artist_name}
                        </Link>
                        <span style={{ color: "var(--muted)" }}>·</span>
                        <span style={{ color: "var(--muted)" }}>{song.year}</span>
                        <span style={{ color: "var(--muted)" }}>·</span>
                        <Link
                            to={`/genres/${song.genres?.genre_id}`}
                            className="font-medium capitalize underline-offset-2 hover:underline"
                            style={{ color: "var(--accent)" }}
                        >
                            {song.genres?.genre_name}
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleAddSong(song.song_id)}>
                            + Add to playlist
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-6xl flex-col gap-10 px-8 py-8">
                <PlaylistBadge selectedPlaylist={selectedPlaylist} />

                <section className="flex flex-col gap-4">
                    <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                        Track stats
                    </h2>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <Stat label="BPM" value={song.bpm != null ? String(song.bpm) : "—"} />
                        <Stat label="Popularity" value={song.popularity != null ? String(song.popularity) : "—"} sub="0–100 scale" />
                        <Stat label="Loudness" value={loudnessDisplay} sub="0–100 scale" />
                        <Stat label="Duration" value={formatSongDuration(song.duration)} sub="min:sec" />
                    </div>
                </section>

                <section
                    className="flex flex-col gap-6 rounded-lg p-6 md:flex-row md:items-center md:justify-between"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                    <div className="flex max-w-md flex-col gap-2">
                        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                            Audio profile
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                            Radar compares energy, danceability, liveness, valence, acousticness, speechiness, and
                            loudness, each drawn on a common ring to scale.
                        </p>
                    </div>
                    <SongAnalyticsRadar key={song.song_id} song={song} size={320} />
                </section>

                <section className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                            Related songs
                        </h2>
                        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                            Closest matches using the sum of your top traits:{" "}
                            <span className="font-semibold" style={{ color: "var(--text)" }}>
                                {topLabels.join(", ")}
                            </span>
                            .
                        </p>
                    </div>
                    {related.length === 0 ? (
                        <p className="text-sm" style={{ color: "var(--muted)" }}>
                            No other songs to compare yet.
                        </p>
                    ) : (
                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((s) => (
                                <li key={s.song_id}>
                                    <Link
                                        to={`/songs/${s.song_id}`}
                                        className="flex flex-col rounded-lg p-4 transition-colors"
                                        style={{
                                            background: "var(--surface)",
                                            border: "1px solid var(--border)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "var(--surface-hover)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "var(--surface)";
                                        }}
                                    >
                                        <span className="font-bold leading-snug" style={{ color: "var(--text-h)" }}>
                                            {s.title}
                                        </span>
                                        <span className="mt-1 truncate text-xs" style={{ color: "var(--muted)" }}>
                                            {s.artists?.artist_name}
                                        </span>
                                        <span className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                                            {s.year} · {s.genres?.genre_name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
};

export default SingleSongView;
