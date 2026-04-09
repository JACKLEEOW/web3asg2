const SongRow = (props) => {
    const {song} = props;
    //<ClearTag clearFilterHandler={clearFilterHandler}/>
    return (
        <tr>
            <td>{song.title}</td>
            <td>{song.artists.artist_name}</td>
            <td>{song.year}</td>
            <td><button>+</button></td>
        </tr>
    );
}

export default SongRow;