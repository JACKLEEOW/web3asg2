import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn, selectedPlaylist }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/">Home</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/genres">Genres</Link>
            <Link to="/playlists">Playlists</Link>

            <span style={{ marginLeft: 'auto' }}>
                {selectedPlaylist
                    ? `Active playlist: ${selectedPlaylist.playlist_name}`
                    : 'No playlist selected'}
            </span>

            {isLoggedIn
                ? <button onClick={handleLogout}>Logout</button>
                : <Link to="/login">Login</Link>}
        </header>
    );
};

export default Header;
