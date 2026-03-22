// function FilterBox (active, type, property, boxName) {
//     this.active = active;
//     this.type = type;
//     this.property = property; // The value that gets compared (e.g. id)
//     this.boxName = boxName; // The value that is displayed to the user (e.g. name)
// }

// const updateFilterHandler = (type, property, displayName, activation = true) => {
const CheckBox = (props) => {
    const {filterBox, updateFilterHandler} = props;
    return (
        <label>
            <input type="checkbox" checked={filterBox.active} 
                onChange={()=>updateFilterHandler(filterBox.type, filterBox.property, filterBox.boxName, !filterBox.active)}
            />
            {filterBox.boxName}
        </label>
    )
}

export default CheckBox;