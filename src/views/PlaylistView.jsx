import { useState, useEffect } from 'react';
import { getPlaylists, createPlaylist, deletePlaylist, removeSongFromPlaylist } from '../api/playlists.js';

const PlaylistView = ({ selectedPlaylist, setSelectedPlaylist, playlistSongs, setPlaylistSongs, refreshPlaylistSongs }) => {
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
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Playlists</h1>

            <form onSubmit={handleCreatePlaylist}>
                <input
                    type="text"
                    placeholder="New playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>

            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.playlist_id}>
                        <button onClick={() => handleSelectPlaylist(playlist)}>
                            {playlist.playlist_name}
                        </button>
                        <button onClick={() => handleDeletePlaylist(playlist.playlist_id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {selectedPlaylist && (
                <div>
                    <h2>{selectedPlaylist.playlist_name}</h2>
                    {playlistSongs.length === 0 ? (
                        <p>No songs in this playlist.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Year</th>
                                    <th>Genre</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playlistSongs.map((row) => (
                                    <tr key={row.song_id}>
                                        <td>{row.songs.title}</td>
                                        <td>{row.songs.artists.artist_name}</td>
                                        <td>{row.songs.year}</td>
                                        <td>{row.songs.genres.genre_name}</td>
                                        <td>
                                            <button onClick={() => handleRemoveSong(row.song_id)}>
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
        </div>
    );
};

export default PlaylistView;
