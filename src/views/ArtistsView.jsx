import { useEffect, useState } from 'react';
import { getAllArtists } from '../api/artists'
import { Link } from 'react-router-dom';

const ArtistsView = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await getAllArtists();
                setArtists(artists);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchArtists();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <h1>Artists</h1>
            <ul>
                {artists.map((artist) => {
                    return (
                        <li key={artist.artist_id}>
                            <Link to={`/artists/${artist.artist_id}`}>{artist.artist_name}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
};

export default ArtistsView;
