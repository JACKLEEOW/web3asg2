import { useState } from "react";

const CheckList = (props) => {
    const { label, filterBoxes, updateFilterHandler, CheckboxComponent } = props;
    const [isOpen, setIsOpen] = useState(true);
    const [text, setText] = useState("");

    return (
        <div className="border-b pb-3 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
            <button
                type="button"
                onClick={() => setIsOpen((o) => !o)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 py-2 text-left transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--muted)';
                }}
            >
                <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
                <span className="text-[0.65rem] opacity-80" aria-hidden>
                    {isOpen ? "▾" : "▸"}
                </span>
            </button>
            {isOpen && (
                <div className="mt-1 flex flex-col gap-1.5">
                    {filterBoxes.map((filterBox, index) => (
                        <CheckboxComponent
                            key={index}
                            filterBox={filterBox}
                            updateFilterHandler={updateFilterHandler}
                            text={text}
                            setText={setText}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CheckList;
