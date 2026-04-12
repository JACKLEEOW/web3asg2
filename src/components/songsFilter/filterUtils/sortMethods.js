import { SORT_TYPES } from "./filterConstants.js";

const titleAsc = (a, b) => a.title.localeCompare(b.title);
const titleDesc = (a, b) => b.title.localeCompare(a.title);
const artistAsc = (a, b) => a.artists.artist_name.localeCompare(b.artists.artist_name);
const artistDesc = (a, b) => b.artists.artist_name.localeCompare(a.artists.artist_name);
const yearAsc = (a, b) => a.year - b.year;
const yearDesc = (a, b) => b.year - a.year;

export const SORT_METHODS = Object.freeze({
    [SORT_TYPES.TITLE_ASC]: titleAsc,
    [SORT_TYPES.TITLE_DESC]: titleDesc,
    [SORT_TYPES.YEAR_ASC]: yearAsc,
    [SORT_TYPES.YEAR_DESC]: yearDesc,
    [SORT_TYPES.ARTIST_ASC]: artistAsc,
    [SORT_TYPES.ARTIST_DESC]: artistDesc,
});
