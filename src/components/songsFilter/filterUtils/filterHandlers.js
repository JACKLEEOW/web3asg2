import { FILTER_TYPES } from "./filterConstants.js";
import { createFilterTag } from "./filterModels.js";

export function createUpdateFilterHandler(setters) {
    const {
        setTitleFilterBox,
        setYearFilterBoxes,
        setArtistFilterBoxes,
        setGenreFilterBoxes,
        setActiveFilterTags,
    } = setters;

    return (type, property, displayName, activation = true) => {
        if (type === FILTER_TYPES.TITLE) {
            setTitleFilterBox((prev) => ({ ...prev, property, active: activation }));
        } else if (type === FILTER_TYPES.YEAR) {
            setYearFilterBoxes((prev) =>
                prev.map((t) => (t.property === property ? { ...t, active: activation } : t))
            );
        } else if (type === FILTER_TYPES.ARTIST) {
            setArtistFilterBoxes((prev) =>
                prev.map((t) => (t.property === property ? { ...t, active: activation } : t))
            );
        } else if (type === FILTER_TYPES.GENRE) {
            setGenreFilterBoxes((prev) =>
                prev.map((t) => (t.property === property ? { ...t, active: activation } : t))
            );
        }

        if (activation) {
            setActiveFilterTags((prev) => [...prev, createFilterTag(type, property, displayName)]);
        } else {
            setActiveFilterTags((prev) =>
                prev.filter((t) => !(t.property === property && t.type === type))
            );
        }
    };
}

export function createClearFiltersHandler(setters) {
    const {
        setTitleFilterBox,
        setYearFilterBoxes,
        setArtistFilterBoxes,
        setGenreFilterBoxes,
        setActiveFilterTags,
    } = setters;

    return () => {
        setTitleFilterBox((prev) => ({ ...prev, active: false }));
        setYearFilterBoxes((prev) => prev.map((t) => ({ ...t, active: false })));
        setArtistFilterBoxes((prev) => prev.map((t) => ({ ...t, active: false })));
        setGenreFilterBoxes((prev) => prev.map((t) => ({ ...t, active: false })));
        setActiveFilterTags([]);
    };
}
