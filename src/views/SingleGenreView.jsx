import { useEffect, useState } from "react";
import SongTable from "../components/SongTable/SongTable.jsx"
import { getSongsByGenre } from "../api/songs.js";
import { getGenreById } from "../api/genres.js";
import { addSongToPlaylist } from "../api/playlists.js";
import { useParams } from "react-router-dom";


const SingleGenreView = ({ selectedPlaylist, refreshPlaylistSongs }) => {
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

    const handleAddSong = async (songId) => {
        if (!selectedPlaylist) return alert('Select a playlist first in the Playlists view!');
        try {
            await addSongToPlaylist(selectedPlaylist.playlist_id, songId);
            await refreshPlaylistSongs();
            alert(`Song added to ${selectedPlaylist.playlist_name}!`);
        } catch (err) {
            alert(`Failed to add song: ${err.message}`);
        }
    };

    return (
        <div>
            <h1>{genre?.genre_name}</h1>
            {selectedPlaylist && <p>Adding to: {selectedPlaylist.playlist_name}</p>}
            <SongTable filteredSongs={songs} onAddSong={handleAddSong}/>
        </div>
    )
};

export default SingleGenreView;
