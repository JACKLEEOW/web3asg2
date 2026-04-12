import { useState, useEffect, useRef } from "react"
import MainPanel from "./mainPanel/MainPanel.jsx";
import FilterPanel from "./filterPanel/FilterPanel.jsx";

function FilterTag (type, property, tagName) {
    this.type = type;
    this.property = property;
    this.tagName = tagName;
}

function FilterBox (active, type, property, boxName) {
    this.active = active;
    this.type = type;
    this.property = property; // The value that gets compared (e.g. id)
    this.boxName = boxName; // The value that is displayed to the user (e.g. name)
}

export const FILTER_TYPES = Object.freeze({
    TITLE : "TITLE",
    YEAR : "YEAR",
    ARTIST : "ARTIST",
    GENRE : "GENRE"
});

export const SORT_TYPES = Object.freeze({
    TITLE_ASC : "TITLE_ASC",
    TITLE_DESC : "TITLE_DESC",
    YEAR_ASC : "YEAR_ASC",
    YEAR_DESC : "YEAR_DESC",
    ARTIST_ASC : "ARTIST_ASC",
    ARTIST_DESC : "ARTIST_DESC"
});

/** Years present in the assignment dataset */
const FILTER_YEARS = [2016, 2017, 2018, 2019];

/* -------------------------------------------------------------------------- */
/*                                Sort Function                               */
/* -------------------------------------------------------------------------- */

const titleAsc = (a, b) => a.title.localeCompare(b.title);
const titleDesc = (a, b) => b.title.localeCompare(a.title);

const artistAsc = (a, b) => a.artists.artist_name.localeCompare(b.artists.artist_name);
const artistDesc = (a, b) => b.artists.artist_name.localeCompare(a.artists.artist_name);

const yearAsc = (a, b) => a.year - b.year;
const yearDesc = (a, b) => b.year - a.year;

const SORT_METHODS = Object.freeze({
    TITLE_ASC : titleAsc,
    TITLE_DESC : titleDesc,
    YEAR_ASC : yearAsc,
    YEAR_DESC : yearDesc,
    ARTIST_ASC : artistAsc,
    ARTIST_DESC : artistDesc
})

const parseOptionalId = (v) => {
    if (v == null || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

const SongsFilterMain = (props) => {
    const { songs, artists, genres, onAddSong, linkArtist = false, initialArtistId, initialGenreId } = props;
    const lastBrowseKeyRef = useRef("");

    // Sort TODO:
    const [selectedSort, setSelectedSort] = useState(SORT_TYPES.TITLE_ASC);

    // Filter Boxes 
    const [titleFilterBox, setTitleFilterBox] = useState(new FilterBox(false, FILTER_TYPES.TITLE, "", null));

    const [yearFilterBoxes, setYearFilterBoxes] = useState(() =>
        FILTER_YEARS.map((y) => new FilterBox(false, FILTER_TYPES.YEAR, y, y))
    );
    const [artistFilterBoxes, setArtistFilterBoxes] = useState([]);
    const [genreFilterBoxes, setGenreFilterBoxes] = useState([]);

    const [activeFilterTags, setActiveFilterTags] = useState([]);

    useEffect(() => {
        const a = parseOptionalId(initialArtistId);
        setArtistFilterBoxes(
            (artists || []).map(
                (t) =>
                    new FilterBox(
                        a != null && t.artist_id === a,
                        FILTER_TYPES.ARTIST,
                        t.artist_id,
                        t.artist_name
                    )
            )
        );
    }, [artists, initialArtistId]);

    useEffect(() => {
        const g = parseOptionalId(initialGenreId);
        setGenreFilterBoxes(
            (genres || []).map(
                (t) =>
                    new FilterBox(
                        g != null && t.genre_id === g,
                        FILTER_TYPES.GENRE,
                        t.genre_id,
                        t.genre_name
                    )
            )
        );
    }, [genres, initialGenreId]);

    useEffect(() => {
        const a = parseOptionalId(initialArtistId);
        const g = parseOptionalId(initialGenreId);
        const browseKey = `${initialArtistId ?? ""}:${initialGenreId ?? ""}`;

        if (a == null && g == null) {
            if (lastBrowseKeyRef.current !== "") {
                lastBrowseKeyRef.current = "";
                setActiveFilterTags((prev) =>
                    prev.filter(
                        (t) => t.type !== FILTER_TYPES.ARTIST && t.type !== FILTER_TYPES.GENRE
                    )
                );
            }
            return;
        }

        const artistName = a != null ? (artists || []).find((x) => x.artist_id === a)?.artist_name : null;
        const genreName = g != null ? (genres || []).find((x) => x.genre_id === g)?.genre_name : null;
        if (a != null && !artistName) return;
        if (g != null && !genreName) return;

        setActiveFilterTags((prev) => {
            const rest = prev.filter((t) => {
                if (a != null && t.type === FILTER_TYPES.ARTIST) return false;
                if (g != null && t.type === FILTER_TYPES.GENRE) return false;
                return true;
            });
            const tags = [];
            if (a != null && artistName) tags.push(new FilterTag(FILTER_TYPES.ARTIST, a, artistName));
            if (g != null && genreName) tags.push(new FilterTag(FILTER_TYPES.GENRE, g, genreName));
            return [...rest, ...tags];
        });
        lastBrowseKeyRef.current = browseKey;
    }, [initialArtistId, initialGenreId, artists, genres]);

    // Using filter boxes
    const matchFilters = (song) => {
        const checkTitle = () => {
            return (
                !titleFilterBox.active || 
                song.title.toLowerCase().includes(titleFilterBox.property.toLowerCase())
            );
        }

        const checkYears = () => {
            // Nothing was found to be active means display all
            let allInactive = true;
            for (let yearBox of yearFilterBoxes) {
                if (yearBox.active) {
                    allInactive = false;
                    if (yearBox.property == song.year) return true;
                }
            }
            return allInactive;
        }

        const checkArtists = () => {
            // Nothing was found to be active means display all
            let allInactive = true;
            for (let artistBox of artistFilterBoxes) {
                if (artistBox.active) {
                    allInactive = false;
                    if (artistBox.property == song.artists.artist_id) return true;
                }
            }
            return allInactive;
        }

        const checkGenres = () => {
            // Nothing was found to be active means display all
            let allInactive = true;
            for (let genreBox of genreFilterBoxes) {
                if (genreBox.active) {
                    allInactive = false;
                    if (genreBox.property == song.genres.genre_id) return true;
                }
            }
            return allInactive;
        }

        return checkTitle() && checkYears() && checkArtists() && checkGenres()
    }

    const updateFilterHandler = (type, property, displayName, activation = true) => {
        
        if (type === FILTER_TYPES.TITLE) {
            setTitleFilterBox(prev => ({...prev, property: property, active: activation}));
        } else if (type === FILTER_TYPES.YEAR) {
            setYearFilterBoxes(prev => prev.map(t => t.property === property ? { ...t, active: activation } : t));
        } else if (type === FILTER_TYPES.ARTIST) {
            setArtistFilterBoxes(prev => prev.map(t => t.property === property ? { ...t, active: activation } : t));
        } else if (type === FILTER_TYPES.GENRE) {
            setGenreFilterBoxes(prev => prev.map(t => t.property === property ? { ...t, active: activation } : t));
        }

        // Update active filter tags
        if (activation) { // Add
            setActiveFilterTags(prev => [...prev, new FilterTag(type, property, displayName)]);
        } else { // Remove
            setActiveFilterTags(prev => prev.filter(t => !(t.property === property && t.type === type)));
        }
    }

    const clearFilterHandler = () => {

        setTitleFilterBox(prev => ({...prev, active: false}));
        setYearFilterBoxes(prev => prev.map(t => ({ ...t, active: false })));
        setArtistFilterBoxes(prev => prev.map(t => ({ ...t, active: false })));
        setGenreFilterBoxes(prev => prev.map(t => ({ ...t, active: false })));

        setActiveFilterTags([]);
    }

    // Filter Songs
    const filterSongs = (songs ?? []).filter(matchFilters);

    // Sort Filtered Songs
    filterSongs.sort(SORT_METHODS[selectedSort]);

    return (
        <div
            className="flex min-h-0 flex-1 flex-col md:flex-row"
            style={{ minHeight: 'min(70vh, 42rem)' }}
        >
            <aside
                className="flex w-full shrink-0 flex-col gap-4 border-b border-[var(--border)] p-6 md:max-h-[calc(100svh-12rem)] md:w-72 md:overflow-y-auto md:border-r md:border-b-0"
                style={{ background: 'var(--bg)' }}
            >
                <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--muted)' }}
                >
                    Filters
                </p>
                <FilterPanel
                    titleFilterBox={titleFilterBox}
                    yearFilterBoxes={yearFilterBoxes}
                    artistFilterBoxes={artistFilterBoxes}
                    genreFilterBoxes={genreFilterBoxes}
                    updateFilterHandler={updateFilterHandler}
                />
            </aside>
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-8">
                <MainPanel
                    filteredSongs={filterSongs}
                    activeFilterTags={activeFilterTags}
                    updateFilterHandler={updateFilterHandler}
                    clearFilterHandler={clearFilterHandler}
                    selectedSort={selectedSort}
                    setSelectedSort={setSelectedSort}
                    onAddSong={onAddSong}
                    linkArtist={linkArtist}
                />
            </main>
        </div>
    );
}

export default SongsFilterMain