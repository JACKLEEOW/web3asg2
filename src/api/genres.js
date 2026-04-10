import supabase from './supabase'

const getAllGenres = async () => {
    const { data, error } = await supabase
        .from('genres')
        .select('genre_id, genre_name')
        .order('genre_name', { ascending: true });
    if (error) { throw error };
    return data
}

const getGenreById = async (id) => {
    const { data, error } = await supabase
        .from('genres')
        .select('genre_id, genre_name')
        .eq('genre_id', id);
    if (error) { throw error };
    return data;
}

export { getAllGenres, getGenreById };