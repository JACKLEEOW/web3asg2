import { getArtistById } from "../api/artists.js";
import { getSongsByArtist } from "../api/songs.js";
import { useState, useEffect } from "react";
import SongTable from "../components/SongTable/SongTable.jsx"
import { useParams } from "react-router-dom";

const SingleArtistView = () => {
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let { artistId } = useParams();
    
    if (!artistId) return <div>No artists ID detected</div>
    artistId = parseInt(artistId);

    useEffect(()=>{
        setLoading(true);

        const songsPromise = getSongsByArtist(artistId);
        const artistPromise = getArtistById(artistId);

        
        Promise.all([songsPromise, artistPromise])
            .then(resolves=>{
                const [songResolve, artistResolve] = resolves;
                
                setArtist(artistResolve);
                setSongs(songResolve);

                setError(false);
            })
            .catch(err=>{
                setError(true);
            })
            .finally(()=>{
                setLoading(false);
            });

    }, [artistId]);


    if (loading) return <div>Loading...</div>
    if (error) return <div>Something Went Wrong...</div>

    return (
        <div>
            <p>{artist.artist_name}</p>
            <SongTable filteredSongs={songs}/>
        </div>
    );
};

export default SingleArtistView;
