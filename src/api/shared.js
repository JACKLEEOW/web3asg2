const SONGS_SELECT = `
    song_id,
    title,
    year,
    duration,
    bpm,
    energy,
    danceability,
    loudness,
    liveness,
    valence,
    acousticness,
    speechiness,
    popularity,
    artists ( artist_id, artist_name, artist_image_url ),
    genres  ( genre_id,  genre_name  )
`;

export { SONGS_SELECT };
