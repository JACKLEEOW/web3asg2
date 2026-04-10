import { getAllGenres } from "../api/genres.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GenresView = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllGenres()
            .then(setGenres)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1>Genres</h1>
            {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : (
                <ul>
                    {genres.map((genre) => (
                        <li key={genre.genre_id}>
                            <Link to={`/genres/${genre.genre_id}`}>{genre.genre_name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GenresView;
