const SortDropDown = (props) => {
    const { selectedSort, setSelectedSort } = props;

    return (
        <div className="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[14rem]">
            <label
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--muted)' }}
            >
                Sort
            </label>
            <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full cursor-pointer rounded-md px-3 py-2 text-sm outline-none"
                style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-h)',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                }}
            >
                <option value="TITLE_ASC">Titles A–Z</option>
                <option value="TITLE_DESC">Titles Z–A</option>
                <option value="ARTIST_ASC">Artists A–Z</option>
                <option value="ARTIST_DESC">Artists Z–A</option>
                <option value="YEAR_ASC">Years ascending</option>
                <option value="YEAR_DESC">Years descending</option>
            </select>
        </div>
    );
};

export default SortDropDown;
