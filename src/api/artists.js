import supabase from './supabase'
const AVG_FIELDS = ['bpm', 'energy', 'danceability', 'loudness', 'liveness', 'valence', 'duration', 'acousticness', 'speechiness', 'popularity'];

const getAllArtists = async () => {
    const { data, error } = await supabase
        .from('artists')
        .select(`
            artist_id,
            artist_name,
            artist_image_url,
            spotify_url,
            spotify_desc,
            types ( type_name )
        `)
        .order('artist_name', { ascending: true });

    if (error) {throw error}

    return data
};

const getArtistAverages = async (artistId) => {
    const ref = artistId;

    if (isNaN(ref)) {
     throw new Error('Artist ID must be a number.');
    }

    const { data: artist, error: artistError } = await supabase
        .from('artists')
        .select('artist_id, artist_name')
        .eq('artist_id', ref)
        .single();

    if (artistError || !artist) {
        throw new Error(`Artist "${ref}" not found.`);
    }

    const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select(AVG_FIELDS.join(', '))
        .eq('artist_id', artist.artist_id);

    if (songsError) throw new Error(songsError.message);

    if (!songs.length) {
        throw new Error(`No songs found for artist "${ref}".`);
    }

    // Compute averages (rounded to whole numbers, matching ROUND(AVG(...)) in SQL)
    const result = {
        artist_id:   artist.artist_id,
        artist_name: artist.artist_name,
    };
    for (const field of AVG_FIELDS) {
        const avg = songs.reduce((sum, s) => sum + s[field], 0) / songs.length;
        result[`avg_${field}`] = Math.round(avg);
    }

    return result;
};

const getArtistById = async (artistId) => {
    const ref = artistId;

    if (isNaN(ref)) {
        throw new Error('Artist ID must be a number.');
    }

    const { data, error } = await supabase
        .from('artists')
        .select(`
            artist_id,
            artist_name,
            artist_image_url,
            spotify_url,
            spotify_desc,
            types ( type_name )
        `)
        .eq('artist_id', ref)
        .single();

    if (error) throw new Error(`Artist with ID ${ref} not found.`);

    return data;
};

export { getAllArtists, getArtistById, getArtistAverages };
