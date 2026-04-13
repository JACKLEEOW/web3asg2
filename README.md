# Songsphere (web3asg2)

Songsphere is a music library web app: browse artists and genres, filter songs, inspect individual tracks, and manage playlists backed by [Supabase](https://supabase.com/).

**Repository:** [https://github.com/JACKLEEOW/web3asg2](https://github.com/JACKLEEOW/web3asg2)

**Live site (Render):** [https://web3asg2.onrender.com/](https://web3asg2.onrender.com/)

## Tech stack

- **React 19** with **Vite 8**
- **React Router 7** (client-side routing)
- **Tailwind CSS 4**
- **Supabase** (database and auth client)
- **Recharts** (analytics on the song detail view)



## How to access each view

Use the **header** (Home, Artists, Genres, Browse, Playlists) or **in-app links** below. Paths are relative to the site root

| View | Path | How to get there |
|------|------|------------------|
| **Home** | `/` | Logo (♪), “Home”, or landing after visiting the site root |
| **Login** | `/login` | “Log in” in the header |
| **Artists (grid)** | `/artists` | Nav → Artists, or Home → “Browse artists” |
| **Single artist** | `/artists/:artistId` | `:artistId` is the numeric artist ID. Linked from **song tables** where the artist name is a link (e.g. **Browse**, **Single song**, **Playlist** song rows), or type the URL manually (e.g. `/artists/3`). *Note: clicking an artist tile on `/artists` opens **Browse** with a filter, not this page.* |
| **Genres (grid)** | `/genres` | Nav → Genres, or Home → “Genres” |
| **Single genre** | `/genres/:genreId` | `:genreId` is the numeric genre ID from your database. **In-app:** open the **genre name** link on a row in **Playlists**, or the genre link on **Single song** (`/songs/:songId`). You can also type the URL directly (e.g. `/genres/2`). ***The genre tiles on `/genres` go to Browse with a query string, not to this page—see below.*** |
| **Browse (filters)** | `/browse` | Nav → Browse. Optional query params (from artist/genre grids): `?artist=<id>`, `?genre=<id>` (e.g. `/browse?genre=2`). |
| **Single song** | `/songs/:songId` | Linked from **title** links in tables that enable song links (e.g. Browse, single artist/genre pages), or type `/songs/<id>` manually |
| **Playlists** | `/playlists` | Nav → Playlists, or Home → “Playlists” |

### Single genre view (`/genres/:genreId`) -> A bit more obscure so we decided to have this section

- **What it shows:** One genre’s name and artwork-style tile, plus all songs in that genre (with links to artists and songs, and optional “add to playlist”).
- **URL shape:** `/genres/<number>` where `<number>` is `genre_id` in Supabase.
- **Ways to open it:**
  1. Go to **Playlists**, pick a playlist, click the **genre** cell for a song → `/genres/<id>`.
  2. Go to **Single song** (`/songs/...`), click the **genre** link → `/genres/<id>`.
  3. Enter `/genres/<id>` in the address bar if you know the ID (e.g. from the database or from a link you copied).
- **Not this route:** On **Genres** (`/genres`), each tile links to **`/browse?genre=<id>`** (filtered browse), **not** to `/genres/<id>`. Use the links above if you need the dedicated single-genre page.

## Footer

The footer includes an **About us** modal (project summary, tech stack, authors) and quick links to collaborators’ GitHub profiles.
