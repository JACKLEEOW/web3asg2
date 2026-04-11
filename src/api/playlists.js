import supabase  from './supabase.js';


const getPlaylists = async () => {
    const { data, error } = await supabase
        .from('playlists')
        .select('playlist_id, playlist_name');
    if (error) throw error;
    return data;
}

const createPlaylist = async (playlistName) => {
    const { data, error } = await supabase
        .from('playlists')
        .insert({ playlist_name: playlistName });
    if (error) throw error;
    return data;
}
const removeSongFromPlaylist = async (playlistId, songId) => {
    const { data, error } = await supabase
        .from('playlist_songs')
        .delete()
        .eq('playlist_id', playlistId)
        .eq('song_id', songId);
    if (error) throw error;
    return data;
}

const addSongToPlaylist = async (playlistId, songId) => {
    const { data, error } = await supabase
        .from('playlist_songs')
        .insert({ playlist_id: playlistId, song_id: songId });
    if (error) {
        if (error.code === '23505') throw new Error('Song is already in this playlist.');
        throw error;
    }
    return data;
}

const deletePlaylist = async (playlistId) => {
    const { data, error } = await supabase
        .from('playlists')
        .delete()
        .eq('playlist_id', playlistId);
    if (error) throw error;
    return data;
}

const getPlaylistSongs = async (playlistId) => {
    const ref = Number(playlistId);
    if (isNaN(ref)) {
        throw new Error('Playlist ID must be a number.');
    }

    const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
            song_id,
            songs (
                song_id,
                title,
                year,
                artists ( artist_id, artist_name ),
                genres  ( genre_id, genre_name )
            )
        `)
        .eq('playlist_id', ref);

    if (error) throw error;
    return data;
};

export { getPlaylists, createPlaylist, removeSongFromPlaylist, addSongToPlaylist, deletePlaylist, getPlaylistSongs };