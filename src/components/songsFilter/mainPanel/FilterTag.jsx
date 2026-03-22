const FilterTag = (props) => {
    const {filterTag, updateFilterHandler} = props
    return (
        <button
            onClick={()=>(updateFilterHandler(filterTag.type, filterTag.property, filterTag.tagName, false))}
        > X {filterTag.tagName} </button>
    )
}
export default FilterTag;