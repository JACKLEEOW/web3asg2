const SongRow = ({ song, onAddSong, index }) => {
    return (
        <tr>
            <td style={{ color: 'var(--muted)', width: '2.5rem' }}>{index + 1}</td>
            <td className="font-medium" style={{ color: 'var(--text-h)' }}>{song.title}</td>
            <td>{song.artists.artist_name}</td>
            <td>{song.year}</td>
            {onAddSong && (
                <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => onAddSong(song.song_id)}>
                        + Add
                    </button>
                </td>
            )}
        </tr>
    );
};

export default SongRow;
