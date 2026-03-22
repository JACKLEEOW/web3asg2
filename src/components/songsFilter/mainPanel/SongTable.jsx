import SongRow from "./SongRow.jsx";
const SongTable = (props) => {
    const {filteredSongs} = props; // Possibly add other for the song scene switch
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Year</th>
                    <th>Add</th>
                </tr>
            </thead>
            <tbody>
                {filteredSongs.map((song, index) => ( <SongRow key={index} song={song}/> ))}
            </tbody>
        </table>
    );
}

export default SongTable;