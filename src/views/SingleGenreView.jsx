import { useEffect, useState } from "react";
import SongTable from "../components/SongTable/SongTable.jsx"
import { getSongsByGenre } from "../api/songs.js";
import { getGenreById } from "../api/genres.js";
import { useParams } from "react-router-dom";


const SingleGenreView = () => {
    const [songs, setSongs] = useState([]);
    const [genre, setGenre] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let { genreId } = useParams();

    if (!genreId) return <div>No genre ID detected</div>
    genreId = parseInt(genreId);

    useEffect(()=>{
        setLoading(true);

        const songsPromise = getSongsByGenre(genreId);
        const genrePromise = getGenreById(genreId);

        Promise.all([songsPromise, genrePromise])
            .then(resolves=>{
                const [songResolve, genreResolve] = resolves;
                
                setSongs(songResolve)
                setGenre(genreResolve);

                setError(false);
            })
            .catch(err=>{
                setError(true);
            })
            .finally(()=>{
                setLoading(false);
            });

    }, [genreId]);


    if (loading) return <div>Loading...</div>
    if (error) return <div>Something Went Wrong...</div>

    return (
        <div>
            <h1>{genre?.genre_name}</h1>
            <SongTable filteredSongs={songs}/>
        </div>
    )
};

export default SingleGenreView;
