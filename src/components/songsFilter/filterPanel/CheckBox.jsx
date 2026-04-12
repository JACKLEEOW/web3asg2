const CheckBox = (props) => {
    const { filterBox, updateFilterHandler } = props;
    return (
        <label
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors"
            style={{ color: 'var(--text)' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
            }}
        >
            <input
                type="checkbox"
                checked={filterBox.active}
                className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded border"
                style={{ borderColor: 'var(--border)', accentColor: 'var(--accent)' }}
                onChange={() =>
                    updateFilterHandler(
                        filterBox.type,
                        filterBox.property,
                        filterBox.boxName,
                        !filterBox.active
                    )
                }
            />
            <span className="min-w-0 truncate leading-snug">{filterBox.boxName}</span>
        </label>
    );
};

export default CheckBox;
