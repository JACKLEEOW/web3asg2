import supabase from './supabase'
import SONGS_SELECT from './shared';

const ORDER_MAP = {
    id: { column: 'song_id' },
    title: { column: 'title' },
    artist: { column: 'artist_name', referencedTable: 'artists' },
    genre: { column: 'genre_name', referencedTable: 'genres' },
    year: { column: 'year' },
    duration: { column: 'duration' },
};

const getAllSongs = async () => {
    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .order('title', { ascending: true });

    if (error) throw new Error(error.message);

    return data;
};

const getSortedSongs = async (order) => {
    const mapping = ORDER_MAP[order];
    if (!mapping) {
        throw new Error(`Invalid sort field "${order}". Valid options: ${Object.keys(ORDER_MAP).join(', ')}`);
    }

    const { column, referencedTable } = mapping;

    let query = supabase
        .from('songs')
        .select(`
            song_id,
            title,
            release_date:year,
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
            artists ( artist_id, artist_name ),
            genres  ( genre_id,  genre_name  )
        `);

    if (referencedTable) {
        query = query.order(column, { referencedTable, ascending: true });
    } else {
        query = query.order(column, { ascending: true });
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data;
};

const getSongById = async (songId) => {
    const ref = Number(songId);

    if (isNaN(ref)) {
        throw new Error('Song ID must be a number.');
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('song_id', ref)
        .single();

    if (error) throw new Error(`Song with ID ${ref} not found.`);

    return data;
};

const getSongsByArtist = async (artistId) => {
    const ref = Number(artistId);

    if (isNaN(ref)) {
        throw new Error('Artist ID must be a number.');
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('artist_id', ref)
        .order('title', { ascending: true });

    if (error) throw new Error(error.message);

    if (!data.length) {
        throw new Error(`No songs found for artist ID ${ref}.`);
    }
    return data;
};

const getSongsByGenre = async (genreId) => {
    const ref = Number(genreId);

    if (isNaN(ref)) {
        throw new Error('Genre ID must be a number.');
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('genre_id', ref)
        .order('title', { ascending: true });

    if (error) throw new Error(error.message);
    if (!data.length) {
        throw new Error(`No songs found for genre ID ${ref}.`);
    }
    return data;
};

export { getAllSongs, getSortedSongs, getSongById, getSongsByArtist, getSongsByGenre };
