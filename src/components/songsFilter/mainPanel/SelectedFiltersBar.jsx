import ClearTag from "./ClearTag.jsx";
import FilterTag from "./FilterTag.jsx";

const SelectedFiltersBar = (props) => {
    const { activeFilterTags, updateFilterHandler, clearFilterHandler } = props;

    if (activeFilterTags.length === 0) {
        return (
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                No filters applied — all songs match.
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted)' }}
            >
                Active filters
            </p>
            <div className="flex flex-wrap items-center gap-2">
                <ClearTag clearFilterHandler={clearFilterHandler} />
                {activeFilterTags.map((filterTag, index) => (
                    <FilterTag
                        filterTag={filterTag}
                        key={`${filterTag.type}-${filterTag.property}-${index}`}
                        updateFilterHandler={updateFilterHandler}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectedFiltersBar;
