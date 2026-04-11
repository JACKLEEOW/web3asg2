import { Link } from 'react-router-dom';

const SongRow = ({ song, onAddSong, index, linkArtist }) => {
    const artistCell = linkArtist ? (
        <Link
            to={`/artists/${song.artists.artist_id}`}
            className="underline-offset-2 hover:underline transition-all"
            style={{ color: 'var(--text-h)' }}
        >
            {song.artists.artist_name}
        </Link>
    ) : (
        song.artists.artist_name
    );

    return (
        <tr>
            <td style={{ color: 'var(--muted)', width: '2.5rem' }}>{index + 1}</td>
            <td className="font-medium" style={{ color: 'var(--text-h)' }}>{song.title}</td>
            <td>{artistCell}</td>
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
