import SongRow from "./SongRow.jsx";
const SongTable = ({filteredSongs, onAddSong}) => {
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
                {filteredSongs.map((song, index) => ( <SongRow key={index} song={song} onAddSong={onAddSong}/> ))}
            </tbody>
        </table>
    );
}

export default SongTable;