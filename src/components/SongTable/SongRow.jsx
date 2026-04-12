import { Link } from 'react-router-dom';

const SongRow = ({ song, onAddSong, index, linkArtist, linkSong = false }) => {
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

    const titleCell =
        linkSong && song.song_id != null ? (
            <Link
                to={`/songs/${song.song_id}`}
                className="font-medium underline-offset-2 hover:underline"
                style={{ color: "var(--text-h)" }}
            >
                {song.title}
            </Link>
        ) : (
            <span className="font-medium" style={{ color: "var(--text-h)" }}>
                {song.title}
            </span>
        );

    return (
        <tr>
            <td style={{ color: 'var(--muted)', width: '2.5rem' }}>{index + 1}</td>
            <td>{titleCell}</td>
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
