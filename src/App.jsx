import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { refreshPlaylistSongs as fetchPlaylistSongs } from './utils/playlistUtils.js'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import SongsFilterMain from './components/songsFilter/SongsFilterMain.jsx'
import { Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView.jsx'
import LoginView from './views/LoginView.jsx'
import ArtistsView from './views/ArtistsView.jsx'
import SingleArtistView from './views/SingleArtistView.jsx'
import GenresView from './views/GenresView.jsx'
import SingleGenreView from './views/SingleGenreView.jsx'
import PlaylistView from './views/PlaylistView.jsx'


function App() {
  const[isLoggedin,setIsLoggedIn] = useState(false)
  const[selectedPlaylist,setSelectedPlaylist] = useState(null)
  const[playlistSongs,setPlaylistSongs] = useState([])

  const refreshPlaylistSongs = (playlist = selectedPlaylist) =>
    fetchPlaylistSongs(playlist, setPlaylistSongs);

  return (
    <div className="flex min-h-svh flex-col" style={{ background: 'var(--bg)' }}>
      <Header isLoggedIn={isLoggedin} setIsLoggedIn={setIsLoggedIn} selectedPlaylist={selectedPlaylist} playlistSongCount={playlistSongs.length} />
      <main className="flex min-h-0 flex-1 flex-col">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/artists" element={<ArtistsView />} />
          <Route path="/artists/:artistId" element={<SingleArtistView selectedPlaylist={selectedPlaylist} refreshPlaylistSongs={refreshPlaylistSongs} />} />
          <Route path="/genres" element={<GenresView />} />
          <Route path="/genres/:genreId" element={<SingleGenreView selectedPlaylist={selectedPlaylist} refreshPlaylistSongs={refreshPlaylistSongs} />} />
          <Route path="/playlists" element={<PlaylistView selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} playlistSongs={playlistSongs} setPlaylistSongs={setPlaylistSongs} refreshPlaylistSongs={refreshPlaylistSongs} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
