import supabase from './supabase'

export const getAllGenres = async () => {
    const { data, error } = await supabase
        .from('genres')
        .select('genre_id, genre_name')
        .order('genre_name', { ascending: true });
    if (error) { throw error };
    return data
}
