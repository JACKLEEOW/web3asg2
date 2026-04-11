import { getPlaylistSongs } from '../api/playlists.js';

export const refreshPlaylistSongs = async (playlist, setPlaylistSongs) => {
    if (!playlist) return;
    try {
        const songs = await getPlaylistSongs(playlist.playlist_id);
        setPlaylistSongs(songs);
    } catch {
        setPlaylistSongs([]);
    }
};
