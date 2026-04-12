import SelectedFiltersBar from "./SelectedFiltersBar.jsx";
import SongTable from "../../SongTable/SongTable.jsx";
import SortDropDown from "./SortDropDown.jsx";

const MainPanel = (props) => {
    const {
        filteredSongs,
        activeFilterTags,
        updateFilterHandler,
        clearFilterHandler,
        selectedSort,
        setSelectedSort,
        onAddSong,
        linkArtist,
        linkSong = false,
    } = props;

    return (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted)' }}
                    >
                        Results
                    </p>
                    <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                        {filteredSongs.length}{" "}
                        {filteredSongs.length === 1 ? "song" : "songs"} shown
                    </p>
                </div>
                <SortDropDown selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
            </div>
            <SelectedFiltersBar
                activeFilterTags={activeFilterTags}
                updateFilterHandler={updateFilterHandler}
                clearFilterHandler={clearFilterHandler}
            />
            <div className="min-w-0 overflow-x-auto">
                <SongTable
                    filteredSongs={filteredSongs}
                    onAddSong={onAddSong}
                    linkArtist={linkArtist}
                    linkSong={linkSong}
                />
            </div>
        </div>
    );
};

export default MainPanel;
