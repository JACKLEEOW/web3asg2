const getPlaylistSongs = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Playlist ID must be a number.' });
    }

    const { data, error } = await supabase
        .from('playlists')
        .select(`
            playlist_id,
            songs (
                song_id,
                title,
                year,
                artists ( artist_name ),
                genres  ( genre_name  )
            )
        `)
        .eq('playlist_id', ref);

    if (error) return res.status(500).json({ error: error.message });

    if (!data.length) {
        return res.status(404).json({ error: `Playlist ${ref} not found.` });
    }

    // flatten each row so the response is a clean list of songs
    const result = data.map(row => ({
        playlist:    row.playlist_id,
        song_id:     row.songs.song_id,
        title:       row.songs.title,
        artist_name: row.songs.artists.artist_name,
        genre_name:  row.songs.genres.genre_name,
        year:        row.songs.year,
    }));

    res.json(result);
};

module.exports = { getPlaylistSongs };
