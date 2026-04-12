import SongRow from "./SongRow.jsx";

const SongTable = ({ filteredSongs, onAddSong, linkArtist = false, linkSong = false }) => {
    if (!filteredSongs?.length) {
        return <p className="text-sm py-4" style={{ color: 'var(--muted)' }}>No songs found.</p>;
    }

    return (
        <table className="ziro-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Year</th>
                    {onAddSong && <th></th>}
                </tr>
            </thead>
            <tbody>
                {filteredSongs.map((song, index) => (
                    <SongRow
                        key={song.song_id ?? index}
                        song={song}
                        onAddSong={onAddSong}
                        index={index}
                        linkArtist={linkArtist}
                        linkSong={linkSong}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default SongTable;
