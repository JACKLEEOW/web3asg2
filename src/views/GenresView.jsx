import { getAllGenres } from "../api/genres.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Cycling palette of muted dark tones for genre tile placeholders
const TILE_COLORS = [
    '#1a2a3a', '#1f2a1f', '#2a1a1a', '#251a2e', '#1a2828',
    '#2a2518', '#1a1f2e', '#2a1f1a', '#1a2520', '#221a2a',
];

const GenresView = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllGenres()
            .then(setGenres)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p style={{ color: 'var(--muted)' }} className="animate-pulse">Loading genres...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-400">Error loading genres.</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

            {/* Hero placeholder */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="px-8 py-12">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: 'var(--muted)' }}>
                    Browse
                </p>
                <h1 className="text-6xl font-extrabold tracking-tight leading-none"
                    style={{ color: 'var(--text-h)' }}>
                    Genres
                </h1>
                <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
                    {genres.length} genres
                </p>
            </div>

            {/* Genre tile grid */}
            <div className="px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {genres.map((genre, i) => (
                        <Link
                            key={genre.genre_id}
                            to={`/genres/${genre.genre_id}`}
                            className="group flex flex-col rounded-md overflow-hidden transition-opacity duration-200 cursor-pointer hover:opacity-80"
                        >
                            {/* Placeholder square */}
                            <div
                                className="w-full aspect-square flex items-center justify-center"
                                style={{ background: TILE_COLORS[i % TILE_COLORS.length] }}
                            >
                                <span className="text-4xl font-black uppercase select-none"
                                    style={{ color: 'var(--text)', opacity: 0.5 }}>
                                    {genre.genre_name.charAt(0)}
                                </span>
                            </div>

                            {/* Label */}
                            <div className="p-3" style={{ background: 'var(--surface)' }}>
                                <p className="font-bold text-sm truncate leading-snug capitalize"
                                    style={{ color: 'var(--text-h)' }}>
                                    {genre.genre_name}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Genre</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenresView;
