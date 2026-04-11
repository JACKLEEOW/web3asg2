import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_LINKS = [
    { to: '/',          label: 'Home' },
    { to: '/artists',   label: 'Artists' },
    { to: '/genres',    label: 'Genres' },
    { to: '/playlists', label: 'Playlists' },
];

const Header = ({ isLoggedIn, setIsLoggedIn, selectedPlaylist, playlistSongCount }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        }} className="flex items-center gap-2 px-6 h-14">

            {/* Nav links */}
            <nav className="flex items-center gap-1">
                {NAV_LINKS.map(({ to, label }) => {
                    const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
                    return (
                        <Link
                            key={to}
                            to={to}
                            className="px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150"
                            style={active
                                ? { background: 'var(--text)', color: 'var(--surface)' }
                                : { color: 'var(--muted)' }}
                            onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--muted)'; }}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-4">
                {selectedPlaylist && (
                    <span className="flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1"
                        style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                        <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{ background: 'var(--accent)' }} />
                        <span>{selectedPlaylist.playlist_name}</span>
                        <span className="px-1.5 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: 'var(--surface-hover)', color: 'var(--accent)' }}>
                            {playlistSongCount}
                        </span>
                    </span>
                )}

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="text-sm font-semibold cursor-pointer transition-colors duration-150"
                        style={{ color: 'var(--muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        Log out
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="text-sm font-semibold px-4 py-1.5 rounded-full transition-colors duration-150"
                        style={{ background: 'var(--text)', color: 'var(--surface)' }}
                    >
                        Log in
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
