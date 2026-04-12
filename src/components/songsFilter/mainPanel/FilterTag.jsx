const FilterTag = (props) => {
    const { filterTag, updateFilterHandler } = props;
    return (
        <button
            type="button"
            onClick={() =>
                updateFilterHandler(filterTag.type, filterTag.property, filterTag.tagName, false)
            }
            className="inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors"
            style={{
                background: 'var(--surface-hover)',
                borderColor: 'var(--border)',
                color: 'var(--text-h)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
            }}
        >
            <span className="opacity-60" aria-hidden>
                ×
            </span>
            <span className="min-w-0 truncate">{filterTag.tagName}</span>
        </button>
    );
};

export default FilterTag;
