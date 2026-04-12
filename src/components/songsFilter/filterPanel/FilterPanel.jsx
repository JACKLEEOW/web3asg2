import CheckList from "./CheckList.jsx"
import TextCheckBox from "./TextCheckBox.jsx";
import CheckBox from "./CheckBox.jsx";

const FilterPanel = (props) => {
    const {titleFilterBox, yearFilterBoxes, artistFilterBoxes, genreFilterBoxes, updateFilterHandler} = props;
    return (
        <div className="flex flex-col gap-1">
            <CheckList label={"Title"} filterBoxes={[titleFilterBox]} updateFilterHandler={updateFilterHandler} CheckboxComponent={TextCheckBox}/>
            <CheckList label={"Year"} filterBoxes={yearFilterBoxes} updateFilterHandler={updateFilterHandler} CheckboxComponent={CheckBox}/>
            <CheckList label={"Artist"} filterBoxes={artistFilterBoxes} updateFilterHandler={updateFilterHandler} CheckboxComponent={CheckBox}/>
            <CheckList label={"Genre"} filterBoxes={genreFilterBoxes} updateFilterHandler={updateFilterHandler} CheckboxComponent={CheckBox}/>
        </div>
    )
}

export default FilterPanel;