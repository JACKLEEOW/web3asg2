/**
 * @param {object} song
 * @param {{
 *   titleFilterBox: { active: boolean, property: string },
 *   yearFilterBoxes: { active: boolean, property: * }[],
 *   artistFilterBoxes: { active: boolean, property: * }[],
 *   genreFilterBoxes: { active: boolean, property: * }[],
 * }} filterState
 */
export function matchSongFilters(song, filterState) {
    const { titleFilterBox, yearFilterBoxes, artistFilterBoxes, genreFilterBoxes } = filterState;

    const checkTitle = () =>
        !titleFilterBox.active ||
        song.title.toLowerCase().includes(String(titleFilterBox.property).toLowerCase());

    const checkYears = () => {
        let allInactive = true;
        for (const yearBox of yearFilterBoxes) {
            if (yearBox.active) {
                allInactive = false;
                if (yearBox.property == song.year) return true;
            }
        }
        return allInactive;
    };

    const checkArtists = () => {
        let allInactive = true;
        for (const artistBox of artistFilterBoxes) {
            if (artistBox.active) {
                allInactive = false;
                if (artistBox.property == song.artists.artist_id) return true;
            }
        }
        return allInactive;
    };

    const checkGenres = () => {
        let allInactive = true;
        for (const genreBox of genreFilterBoxes) {
            if (genreBox.active) {
                allInactive = false;
                if (genreBox.property == song.genres.genre_id) return true;
            }
        }
        return allInactive;
    };

    return checkTitle() && checkYears() && checkArtists() && checkGenres();
}
