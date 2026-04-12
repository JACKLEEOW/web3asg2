const TextCheckBox = (props) => {
    const { text, setText, filterBox, updateFilterHandler } = props;

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                value={text}
                placeholder="Search title…"
                className="w-full rounded-md px-3 py-2 text-sm outline-none"
                style={{
                    background: 'var(--surface-hover)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-h)',
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                }}
                onChange={(e) => {
                    setText(e.target.value);
                    if (filterBox.active) updateFilterHandler(filterBox.type, text, text, false);
                    if (e.target.value.length > 0) {
                        updateFilterHandler(filterBox.type, e.target.value, e.target.value, true);
                    }
                }}
            />
            <label
                className="flex cursor-pointer items-center gap-2.5 text-sm"
                style={{ color: text.length === 0 ? 'var(--muted)' : 'var(--text)' }}
            >
                <input
                    type="checkbox"
                    checked={filterBox.active}
                    disabled={text.length === 0}
                    className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded border disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ borderColor: 'var(--border)', accentColor: 'var(--accent)' }}
                    onChange={() =>
                        updateFilterHandler(filterBox.type, text, text, !filterBox.active)
                    }
                />
                <span>Match title filter</span>
            </label>
        </div>
    );
};

export default TextCheckBox;
