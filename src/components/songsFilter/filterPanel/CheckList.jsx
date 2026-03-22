import CheckBox from "./CheckBox.jsx"
const CheckList = (props) => {
    const {label} = props;
    const {filterBoxes, updateFilterHandler} = props;
    
    return (
        <div>
            <p>{label}</p>
            {filterBoxes.map((filterBox, index)=>(<CheckBox key={index} filterBox={filterBox} updateFilterHandler={updateFilterHandler}/> ))}
        </div>
    )
}

export default CheckList;