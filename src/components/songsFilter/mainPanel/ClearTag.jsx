const ClearTag = (props) => {
    const {clearFilterHandler} = props;

    return (
        <button onClick={()=>(clearFilterHandler())}> 
            Clear Filters 
        </button>
    );
}

export default ClearTag;