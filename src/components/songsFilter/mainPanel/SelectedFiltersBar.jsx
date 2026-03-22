import ClearTag from "./ClearTag.jsx";
import FilterTag from "./FilterTag.jsx";

const SelectedFiltersBar = (props) => {
    const {activeFilterTags, updateFilterHandler, clearFilterHandler } = props;
    
    return (
        <div>
            <ClearTag clearFilterHandler={clearFilterHandler}/>
            {activeFilterTags.map((filterTag, index)=>
                <FilterTag 
                    filterTag={filterTag}
                    key={index} 
                    updateFilterHandler={updateFilterHandler}
                />
            )}
        </div>
    );
}

export default SelectedFiltersBar;