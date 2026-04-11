const PlaylistBadge = ({ selectedPlaylist }) => {
    if (!selectedPlaylist) return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: 'var(--surface-hover)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            No playlist selected — go to Playlists to choose one
        </span>
    );

    return (
        <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(189,230,251,0.1)', color: 'var(--accent)', border: '1px solid rgba(189,230,251,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
            Adding to: <span style={{ color: 'var(--text-h)' }}>{selectedPlaylist.playlist_name}</span>
        </span>
    );
};

export default PlaylistBadge;
