import { useEffect, useState } from "react";
import SongTable from "../components/SongTable/SongTable.jsx"
import { getSongsByGenre } from "../api/songs.js";
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
        //const genrePromise = getArtistById(genreId);

        Promise.all([songsPromise])
            .then(resolves=>{
                const [songResolve] = resolves;
                
                setSongs(songResolve);

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
            <p>Genre View</p>
            <SongTable filteredSongs={songs}/>
        </div>
    )
};

export default SingleGenreView;
