import SelectedFiltersBar from "./SelectedFiltersBar.jsx";
import SongTable from "./SongTable.jsx";
import SortDropDown from "./SortDropdown.jsx";

const MainPanel = (props) => {
    const {filteredSongs, activeFilterTags, updateFilterHandler, clearFilterHandler, selectedSort, setSelectedSort} = props;

    return (
        <div>
            <SortDropDown
                selectedSort={selectedSort}
                setSelectedSort={setSelectedSort}
            />
            <SelectedFiltersBar 
                activeFilterTags={activeFilterTags}
                updateFilterHandler={updateFilterHandler}
                clearFilterHandler={clearFilterHandler}
            />
            <SongTable 
                filteredSongs={filteredSongs}
            />
        </div>
    )
}

export default MainPanel