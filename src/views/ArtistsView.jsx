import { useEffect, useState } from 'react';
import { getAllArtists } from '../api/artists';
import { Link } from 'react-router-dom';
import AudioLevelLoader from '../components/AudioLevelLoader.jsx';
import { withMinDelay } from '../utils/withMinDelay.js';

const ArtistsView = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await withMinDelay(getAllArtists());
                setArtists(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchArtists();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]" style={{ background: 'var(--bg)' }}>
                <AudioLevelLoader label="Loading artists" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-400">Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

            {/* Hero placeholder */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="px-8 py-12">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                    Browse
                </p>
                <h1 className="text-6xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--text-h)' }}>
                    Artists
                </h1>
                <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
                    {artists.length} artists
                </p>
            </div>

            {/* Square tile grid */}
            <div className="px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {artists.map((artist) => (
                        <Link
                            key={artist.artist_id}
                            to={`/artists/${artist.artist_id}`}
                            className="group flex flex-col rounded-md overflow-hidden transition-colors duration-200 cursor-pointer"
                            style={{ background: 'var(--surface)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-hover)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
                        >
                            {/* Square image */}
                            <div className="w-full aspect-square overflow-hidden">
                                <img
                                    src={artist.artist_image_url}
                                    alt={artist.artist_name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={e => { e.target.src = 'https://placehold.co/300x300/171d20/6d8692?text=?'; }}
                                />
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <p className="font-bold text-sm truncate leading-snug" style={{ color: 'var(--text-h)' }}>
                                    {artist.artist_name}
                                </p>
                                <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>
                                    {artist.types?.type_name ?? 'Artist'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistsView;
