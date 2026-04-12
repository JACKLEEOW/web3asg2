import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SongsFilterMain from '../components/songsFilter/SongsFilterMain.jsx';
import PlaylistBadge from '../components/PlaylistBadge.jsx';
import AudioLevelLoader from '../components/AudioLevelLoader.jsx';
import { useToast } from '../components/Toast/ToastProvider.jsx';
import { withMinDelay } from '../utils/withMinDelay.js';
import { getAllSongs } from '../api/songs.js';
import { getAllArtists } from '../api/artists.js';
import { getAllGenres } from '../api/genres.js';
import { addSongToPlaylist } from '../api/playlists.js';

const BrowseView = ({ selectedPlaylist, refreshPlaylistSongs }) => {
    const [searchParams] = useSearchParams();
    const initialArtistId = searchParams.get('artist') ?? undefined;
    const initialGenreId = searchParams.get('genre') ?? undefined;

    const { showToast } = useToast();
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        withMinDelay(
            Promise.all([getAllSongs(), getAllArtists(), getAllGenres()])
        )
            .then(([songData, artistData, genreData]) => {
                setSongs(songData);
                setArtists(artistData);
                setGenres(genreData);
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const handleAddSong = async (songId) => {
        if (!selectedPlaylist) {
            showToast('Select a playlist first in the Playlists view.', 'error');
            return;
        }
        try {
            await addSongToPlaylist(selectedPlaylist.playlist_id, songId);
            await refreshPlaylistSongs();
            showToast(`Added to "${selectedPlaylist.playlist_name}"`, 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center" style={{ background: 'var(--bg)' }}>
                <AudioLevelLoader label="Loading library" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center" style={{ background: 'var(--bg)' }}>
                <p className="text-red-400">Something went wrong.</p>
            </div>
        );
    }

    return (
        <div
            className="flex min-h-0 flex-1 flex-col"
            style={{ background: 'var(--bg)', minHeight: '100vh' }}
        >
            <div
                style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="flex items-end gap-8 px-8 py-10"
            >
                <div
                    className="flex h-40 w-40 shrink-0 items-center justify-center rounded-md shadow-lg"
                    style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
                >
                    <span
                        className="select-none text-5xl font-black uppercase"
                        style={{ color: 'var(--text)', opacity: 0.45 }}
                    >
                        ♪
                    </span>
                </div>
                <div className="flex min-w-0 flex-col gap-2 pb-0.5">
                    <span
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted)' }}
                    >
                        Library
                    </span>
                    <h1
                        className="text-5xl font-extrabold leading-none tracking-tight"
                        style={{ color: 'var(--text-h)' }}
                    >
                        Browse songs
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {songs.length} {songs.length === 1 ? 'song' : 'songs'} — filter by title, year, artist, or genre
                    </p>
                </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 px-8 py-6">
                <PlaylistBadge selectedPlaylist={selectedPlaylist} />
                <SongsFilterMain
                    songs={songs}
                    artists={artists}
                    genres={genres}
                    initialArtistId={initialArtistId}
                    initialGenreId={initialGenreId}
                    onAddSong={handleAddSong}
                    linkArtist
                    linkSong
                />
            </div>
        </div>
    );
};

export default BrowseView;
