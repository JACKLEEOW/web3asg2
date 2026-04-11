import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongTable from "../components/SongTable/SongTable.jsx";
import PlaylistBadge from "../components/PlaylistBadge.jsx";
import { useToast } from "../components/Toast/ToastProvider.jsx";
import AudioLevelLoader from "../components/AudioLevelLoader.jsx";
import { withMinDelay } from "../utils/withMinDelay.js";
import { getArtistById } from "../api/artists.js";
import { getSongsByArtist } from "../api/songs.js";
import { addSongToPlaylist } from "../api/playlists.js";

const SingleArtistView = ({ selectedPlaylist, refreshPlaylistSongs }) => {
    const { showToast } = useToast();
    const [songs, setSongs] = useState([]);
    const [artist, setArtist] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    let { artistId } = useParams();
    if (!artistId) return <div>No artist ID detected</div>;
    artistId = parseInt(artistId);

    useEffect(() => {
        setLoading(true);
        withMinDelay(Promise.all([getSongsByArtist(artistId), getArtistById(artistId)]))
            .then(([songData, artistData]) => {
                setSongs(songData);
                setArtist(artistData);
                setError(false);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [artistId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]" style={{ background: 'var(--bg)' }}>
                <AudioLevelLoader label="Loading artist" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-red-400">Something went wrong.</p>
            </div>
        );
    }

    const handleAddSong = async (songId) => {
        if (!selectedPlaylist) {
            showToast('Select a playlist first in the Playlists view.', 'error');
            return;
        }
        try {
            await addSongToPlaylist(selectedPlaylist.playlist_id, songId);
            await refreshPlaylistSongs();
            showToast(`Added to "${selectedPlaylist.playlist_name}"`, 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

            {/* Hero */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
                className="flex items-end gap-8 px-8 py-10">
                {/* Artist image */}
                <img
                    src={artist?.artist_image_url}
                    alt={artist?.artist_name}
                    className="w-40 h-40 rounded-md object-cover shrink-0 shadow-lg"
                    style={{ border: '1px solid var(--border)' }}
                    onError={e => { e.target.src = 'https://placehold.co/160x160/171d20/6d8692?text=?'; }}
                />

                <div className="flex flex-col gap-2 min-w-0">
                    {/* Type badge */}
                    <span className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted)' }}>
                        {artist?.types?.type_name ?? 'Artist'}
                    </span>

                    {/* Name */}
                    <h1 className="text-5xl font-extrabold tracking-tight leading-none"
                        style={{ color: 'var(--text-h)' }}>
                        {artist?.artist_name}
                    </h1>

                    {/* Song count */}
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                    </p>

                    {/* Description */}
                    {artist?.spotify_desc && artist.spotify_desc !== 'N/A' && (
                        <p className="text-sm leading-relaxed max-w-2xl line-clamp-3"
                            style={{ color: 'var(--text)' }}>
                            {artist.spotify_desc}
                        </p>
                    )}

                    {/* Spotify link */}
                    {artist?.spotify_url && (
                        <a
                            href={artist.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm self-start mt-1"
                        >
                            ↗ Open on Spotify
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6 flex flex-col gap-5">
                <PlaylistBadge selectedPlaylist={selectedPlaylist} />
                <SongTable filteredSongs={songs} onAddSong={handleAddSong} />
            </div>
        </div>
    );
};

export default SingleArtistView;
