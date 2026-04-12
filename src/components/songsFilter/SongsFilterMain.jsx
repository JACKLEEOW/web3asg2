import { useMemo, useState } from "react";
import MainPanel from "./mainPanel/MainPanel.jsx";
import FilterPanel from "./filterPanel/FilterPanel.jsx";
import { FILTER_TYPES, SORT_TYPES, FILTER_YEARS } from "./filterUtils/filterConstants.js";
import { createFilterBox } from "./filterUtils/filterModels.js";
import { SORT_METHODS } from "./filterUtils/sortMethods.js";
import { matchSongFilters } from "./filterUtils/matchSongFilters.js";
import { createUpdateFilterHandler, createClearFiltersHandler } from "./filterUtils/filterHandlers.js";
import { useBrowseQueryFilters } from "./filterUtils/useBrowseQueryFilters.js";

export { FILTER_TYPES, SORT_TYPES } from "./filterUtils/filterConstants.js";

const SongsFilterMain = (props) => {
    const { songs, artists, genres, onAddSong, linkArtist = false, initialArtistId, initialGenreId } = props;

    const [selectedSort, setSelectedSort] = useState(SORT_TYPES.TITLE_ASC);

    const [titleFilterBox, setTitleFilterBox] = useState(() =>
        createFilterBox(false, FILTER_TYPES.TITLE, "", null)
    );
    const [yearFilterBoxes, setYearFilterBoxes] = useState(() =>
        FILTER_YEARS.map((y) => createFilterBox(false, FILTER_TYPES.YEAR, y, y))
    );
    const [artistFilterBoxes, setArtistFilterBoxes] = useState([]);
    const [genreFilterBoxes, setGenreFilterBoxes] = useState([]);
    const [activeFilterTags, setActiveFilterTags] = useState([]);

    useBrowseQueryFilters({
        initialArtistId,
        initialGenreId,
        artists,
        genres,
        setArtistFilterBoxes,
        setGenreFilterBoxes,
        setActiveFilterTags,
    });

    const updateFilterHandler = useMemo(
        () =>
            createUpdateFilterHandler({
                setTitleFilterBox,
                setYearFilterBoxes,
                setArtistFilterBoxes,
                setGenreFilterBoxes,
                setActiveFilterTags,
            }),
        []
    );

    const clearFilterHandler = useMemo(
        () =>
            createClearFiltersHandler({
                setTitleFilterBox,
                setYearFilterBoxes,
                setArtistFilterBoxes,
                setGenreFilterBoxes,
                setActiveFilterTags,
            }),
        []
    );

    const filterState = {
        titleFilterBox,
        yearFilterBoxes,
        artistFilterBoxes,
        genreFilterBoxes,
    };

    const filterSongs = (songs ?? []).filter((song) => matchSongFilters(song, filterState));
    filterSongs.sort(SORT_METHODS[selectedSort]);

    return (
        <div
            className="flex min-h-0 flex-1 flex-col md:flex-row"
            style={{ minHeight: "min(70vh, 42rem)" }}
        >
            <aside
                className="flex w-full shrink-0 flex-col gap-4 border-b border-[var(--border)] p-6 md:max-h-[calc(100svh-12rem)] md:w-72 md:overflow-y-auto md:border-r md:border-b-0"
                style={{ background: "var(--bg)" }}
            >
                <p
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--muted)" }}
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
};

export default SongsFilterMain;
