import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists, createPlaylist, deletePlaylist, removeSongFromPlaylist } from '../api/playlists.js';
import { useToast } from '../components/Toast/ToastProvider.jsx';

const PlaylistView = ({ selectedPlaylist, setSelectedPlaylist, playlistSongs, setPlaylistSongs, refreshPlaylistSongs }) => {
    const { showToast } = useToast();
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPlaylists = async () => {
        try {
            const data = await getPlaylists();
            setPlaylists(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleSelectPlaylist = async (playlist) => {
        setSelectedPlaylist(playlist);
        await refreshPlaylistSongs(playlist);
    };

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        if (!newPlaylistName.trim()) return;
        try {
            await createPlaylist(newPlaylistName.trim());
            setNewPlaylistName('');
            fetchPlaylists();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeletePlaylist = async (playlistId) => {
        try {
            await deletePlaylist(playlistId);
            if (selectedPlaylist?.playlist_id === playlistId) {
                setSelectedPlaylist(null);
                setPlaylistSongs([]);
            }
            fetchPlaylists();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemoveSong = async (songId) => {
        try {
            await removeSongFromPlaylist(selectedPlaylist.playlist_id, songId);
            await refreshPlaylistSongs();
            showToast(`Removed from "${selectedPlaylist.playlist_name}"`, 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p style={{ color: 'var(--muted)' }} className="animate-pulse">Loading playlists...</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Page header */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="px-8 py-10">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
                    Library
                </p>
                <h1 className="text-5xl font-extrabold tracking-tight leading-none" style={{ color: 'var(--text-h)' }}>
                    Playlists
                </h1>
            </div>

            {error && (
                <div className="mx-8 mt-4 px-4 py-3 rounded-lg text-sm text-red-400"
                    style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)' }}>
                    {error}
                </div>
            )}

            {/* Two-panel layout */}
            <div className="flex flex-1" style={{ minHeight: 0 }}>

                {/* Left panel — playlist list */}
                <aside className="flex flex-col gap-4 p-6 w-72 shrink-0"
                    style={{ borderRight: '1px solid var(--border)' }}>

                    {/* Create form */}
                    <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-widest"
                            style={{ color: 'var(--muted)' }}>
                            New Playlist
                        </label>
                        <input
                            type="text"
                            placeholder="Playlist name..."
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            className="w-full px-3 py-2 rounded-md text-sm outline-none"
                            style={{
                                background: 'var(--surface-hover)',
                                border: '1px solid var(--border)',
                                color: 'var(--text)',
                            }}
                        />
                        <button type="submit" className="btn btn-primary w-full">
                            + Create
                        </button>
                    </form>

                    <hr style={{ borderColor: 'var(--border)' }} />

                    {/* Playlist list */}
                    <div className="flex flex-col gap-1 overflow-y-auto">
                        {playlists.length === 0 ? (
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>No playlists yet.</p>
                        ) : (
                            playlists.map((playlist) => {
                                const isActive = selectedPlaylist?.playlist_id === playlist.playlist_id;
                                return (
                                    <div
                                        key={playlist.playlist_id}
                                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-md group"
                                        style={{
                                            background: isActive ? 'var(--surface-hover)' : 'transparent',
                                            border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <button
                                            onClick={() => handleSelectPlaylist(playlist)}
                                            className="flex-1 text-left text-sm font-medium truncate"
                                            style={{ color: isActive ? 'var(--text-h)' : 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            {isActive && <span className="mr-2" style={{ color: 'var(--accent)' }}>▶</span>}
                                            {playlist.playlist_name}
                                        </button>
                                        <button
                                            onClick={() => handleDeletePlaylist(playlist.playlist_id)}
                                            className="btn btn-danger btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* Right panel — selected playlist songs */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {!selectedPlaylist ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 opacity-40">
                            <span className="text-5xl">♪</span>
                            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                Select a playlist to view its songs
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                                        style={{ color: 'var(--muted)' }}>Playlist</p>
                                    <h2 className="text-3xl font-extrabold tracking-tight"
                                        style={{ color: 'var(--text-h)' }}>
                                        {selectedPlaylist.playlist_name}
                                    </h2>
                                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                                        {playlistSongs.length} {playlistSongs.length === 1 ? 'song' : 'songs'}
                                    </p>
                                </div>
                            </div>

                            {playlistSongs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 gap-2 opacity-40">
                                    <span className="text-4xl">♫</span>
                                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                        No songs yet — add some from the Artists or Genres views.
                                    </p>
                                </div>
                            ) : (
                                <table className="ziro-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Artist</th>
                                            <th>Year</th>
                                            <th>Genre</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {playlistSongs.map((row, i) => (
                                            <tr key={row.song_id}>
                                                <td style={{ color: 'var(--muted)', width: '2.5rem' }}>{i + 1}</td>
                                                <td className="font-medium" style={{ color: 'var(--text-h)' }}>
                                                    {row.songs.title}
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/artists/${row.songs.artists.artist_id}`}
                                                        className="underline-offset-2 hover:underline transition-all"
                                                        style={{ color: 'var(--text-h)' }}
                                                    >
                                                        {row.songs.artists.artist_name}
                                                    </Link>
                                                </td>
                                                <td>{row.songs.year}</td>
                                                <td>
                                                    <Link
                                                        to={`/genres/${row.songs.genres.genre_id}`}
                                                        className="underline-offset-2 hover:underline transition-all"
                                                        style={{ color: 'var(--text-h)' }}
                                                    >
                                                        {row.songs.genres.genre_name}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => handleRemoveSong(row.song_id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PlaylistView;
