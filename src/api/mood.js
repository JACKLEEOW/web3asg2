const { SONGS_SELECT } = require('./shared');

const getMoodDancing = (supabase) => async (req, res) => {
    const n = Number(req.params.ref);
    const limit = (!req.params.ref || isNaN(n) || n < 1 || n > 20) ? 20 : n;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .order('danceability', { ascending: false })
        .limit(limit);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const getMoodHappy = (supabase) => async (req, res) => {
    const n = Number(req.params.ref);
    const limit = (!req.params.ref || isNaN(n) || n < 1 || n > 20) ? 20 : n;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .order('valence', { ascending: false })
        .limit(limit);

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const getMoodCoffee = (supabase) => async (req, res) => {
    const n = Number(req.params.ref);
    const limit = (!req.params.ref || isNaN(n) || n < 1 || n > 20) ? 20 : n;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT);

    if (error) return res.status(500).json({ error: error.message });

    // Sort by liveness / acousticness descending, guard against division by zero
    const sorted = data
        .sort((a, b) => {
            const ratioA = a.acousticness !== 0 ? a.liveness / a.acousticness : Infinity;
            const ratioB = b.acousticness !== 0 ? b.liveness / b.acousticness : Infinity;
            return ratioB - ratioA;
        })
        .slice(0, limit);

    res.json(sorted);
};

const getMoodStudying = (supabase) => async (req, res) => {
    const n = Number(req.params.ref);
    const limit = (!req.params.ref || isNaN(n) || n < 1 || n > 20) ? 20 : n;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT);

    if (error) return res.status(500).json({ error: error.message });

    // Sort by energy * speechiness ascending
    const sorted = data
        .sort((a, b) => (a.energy * a.speechiness) - (b.energy * b.speechiness))
        .slice(0, limit);

    res.json(sorted);
};

module.exports = { getMoodDancing, getMoodHappy, getMoodCoffee, getMoodStudying };
