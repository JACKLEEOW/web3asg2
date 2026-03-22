import { useState, useEffect } from "react"
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
})

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

const SongsFilterMain = (props) => {
    const {openArtistPage, openSongPage, addToPlayList} = props

    // Assuming songs, artists, and genres come from props
    const {songs, artists, genres} = props;
    const years = [2016, 2017, 2018, 2019]; // Within A1, these were the ONLY years we had

    // Sort TODO:
    const [selectedSort, setSelectedSort] = useState(SORT_TYPES.TITLE_ASC);

    // Filter Boxes 
    const [titleFilterBox, setTitleFilterBox] = useState(new FilterBox(false, FILTER_TYPES.TITLE, "", null));

    const [yearFilterBoxes, setYearFilterBoxes] = useState(years.map(t => (new FilterBox(false, FILTER_TYPES.YEAR, t, t))));
    const [artistFilterBoxes, setArtistFilterBoxes] = useState(artists.map(t => (new FilterBox(false, FILTER_TYPES.ARTIST, t.artist_id, t.artist_name))));
    const [genreFilterBoxes, setGenreFilterBoxes] = useState(genres.map(t => (new FilterBox(false, FILTER_TYPES.GENRE, t.genre_id, t.genre_name))));
    
    // Filter Tags
    const [activeFilterTags, setActiveFilterTags] = useState([]);

    // Using filter boxes
    const matchFilters = (song) => {
        const checkTitle = () => {
            return (
                !titleFilterBox.active || 
                song.title.toLowerCase().includes(titleFilterBox.value)
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
        
        // Update filter boxes
        // console.log(type, property, displayName, activation);

        if (type === FILTER_TYPES.TITLE) {
            setTitleFilterBox(prev => ({...prev, active: activation}));
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
    const filterSongs = songs.filter(matchFilters)

    // Sort Filtered Songs
    filterSongs.sort(SORT_METHODS[selectedSort]) 

    return (
        <div>
            <FilterPanel
                titleFilterBox={titleFilterBox}
                yearFilterBoxes={yearFilterBoxes}
                artistFilterBoxes={artistFilterBoxes} 
                genreFilterBoxes={genreFilterBoxes}
                updateFilterHandler={updateFilterHandler}
            />  
            <MainPanel 
                filteredSongs={filterSongs}
                activeFilterTags={activeFilterTags}
                updateFilterHandler={updateFilterHandler}
                clearFilterHandler={clearFilterHandler}
                selectedSort={selectedSort} 
                setSelectedSort={setSelectedSort}
            />
        </div>
    )
}

export default SongsFilterMain