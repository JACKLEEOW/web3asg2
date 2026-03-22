export const SORT_TYPES = Object.freeze({
    TITLE_ASC : "TITLE_ASC",
    TITLE_DESC : "TITLE_DESC",
    YEAR_ASC : "YEAR_ASC",
    YEAR_DESC : "YEAR_DESC",
    ARTIST_ASC : "ARTIST_ASC",
    ARTIST_DESC : "ARTIST_DESC"
})

const SortDropDown = (props) => {
    const { selectedSort, setSelectedSort } = props;

    return (
        <div>
            <label> Sort
                <select value={selectedSort} onChange={(e)=>(setSelectedSort(e.target.value))}>
                    <option value="TITLE_ASC">Titles A-Z</option>
                    <option value="TITLE_DESC">Titles Z-A</option>
                    <option value="ARTIST_ASC">Artists A-Z</option>
                    <option value="ARTIST_DESC">Artists Z-A</option>
                    <option value="YEAR_ASC">Years Ascending</option>
                    <option value="YEAR_DESC">Years Descending</option>
                </select>
            </label>
        </div>
    );
}

export default SortDropDown;