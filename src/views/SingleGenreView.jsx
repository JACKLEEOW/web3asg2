import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongTable from "../components/SongTable/SongTable.jsx";
import PlaylistBadge from "../components/PlaylistBadge.jsx";
import { useToast } from "../components/Toast/ToastProvider.jsx";
import { getSongsByGenre } from "../api/songs.js";
import { getGenreById } from "../api/genres.js";
import { addSongToPlaylist } from "../api/playlists.js";

const SingleGenreView = ({ selectedPlaylist, refreshPlaylistSongs }) => {
    const { showToast } = useToast();
    const [songs, setSongs] = useState([]);
    const [genre, setGenre] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let { genreId } = useParams();
    if (!genreId) return <div>No genre ID detected</div>;
    genreId = parseInt(genreId);

    useEffect(() => {
        setLoading(true);
        Promise.all([getSongsByGenre(genreId), getGenreById(genreId)])
            .then(([songData, genreData]) => {
                setSongs(songData);
                setGenre(genreData);
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [genreId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p style={{ color: 'var(--muted)' }} className="animate-pulse">Loading...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-400">Something went wrong.</p>
            </div>
        );
    }

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

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

            {/* Hero — mirrors single artist layout */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="flex items-end gap-8 px-8 py-10">
                {/* Placeholder tile */}
                <div
                    className="w-40 h-40 rounded-md shrink-0 flex items-center justify-center shadow-lg"
                    style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}
                >
                    <span className="text-5xl font-black uppercase select-none"
                        style={{ color: 'var(--text)', opacity: 0.45 }}>
                        {genre?.genre_name?.charAt(0) ?? '?'}
                    </span>
                </div>

                <div className="flex flex-col gap-2 min-w-0 pb-0.5">
                    <span className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted)' }}>
                        Genre
                    </span>
                    <h1 className="text-5xl font-extrabold tracking-tight leading-none capitalize"
                        style={{ color: 'var(--text-h)' }}>
                        {genre?.genre_name}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6 flex flex-col gap-5">
                <PlaylistBadge selectedPlaylist={selectedPlaylist} />
                <SongTable filteredSongs={songs} onAddSong={handleAddSong} />
            </div>
        </div>
    );
};

export default SingleGenreView;
