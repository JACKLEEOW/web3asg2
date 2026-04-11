const SongRow = (props) => {
    const {song, onAddSong} = props;

    //<ClearTag clearFilterHandler={clearFilterHandler}/>
    return (
        <tr>
            <td>{song.title}</td>
            <td>{song.artists.artist_name}</td>
            <td>{song.year}</td>
            <td><button onClick={() => onAddSong(song.song_id)}>+</button></td>
        </tr>
    );
}

export default SongRow;