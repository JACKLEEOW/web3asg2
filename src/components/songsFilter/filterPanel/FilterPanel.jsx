import CheckList from "./CheckList.jsx"

const FilterPanel = (props) => {
    const {titleFilterBox, yearFilterBoxes, artistFilterBoxes, genreFilterBoxes, updateFilterHandler} = props;
    return (
        <div>
            <CheckList label={"Year"} filterBoxes={yearFilterBoxes} updateFilterHandler={updateFilterHandler}/>
            <CheckList label={"Artist"} filterBoxes={artistFilterBoxes} updateFilterHandler={updateFilterHandler}/>
            <CheckList label={"Genre"} filterBoxes={genreFilterBoxes} updateFilterHandler={updateFilterHandler}/>
        </div>
    )
}

export default FilterPanel;