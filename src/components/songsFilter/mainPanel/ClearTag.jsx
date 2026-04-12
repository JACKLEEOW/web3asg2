const ClearTag = (props) => {
    const { clearFilterHandler } = props;

    return (
        <button type="button" onClick={() => clearFilterHandler()} className="btn btn-ghost btn-sm">
            Clear all
        </button>
    );
};

export default ClearTag;
