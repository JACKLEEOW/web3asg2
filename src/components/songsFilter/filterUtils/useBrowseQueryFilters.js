import { useEffect, useRef } from "react";
import { FILTER_TYPES } from "./filterConstants.js";
import { createFilterBox, createFilterTag } from "./filterModels.js";
import { parseOptionalId } from "./parseOptionalId.js";

/**
 * Keeps artist/genre filter boxes and tags in sync with `/browse?artist=` / `?genre=` query params.
 */
export function useBrowseQueryFilters({
    initialArtistId,
    initialGenreId,
    artists,
    genres,
    setArtistFilterBoxes,
    setGenreFilterBoxes,
    setActiveFilterTags,
}) {
    const lastBrowseKeyRef = useRef("");

    useEffect(() => {
        const a = parseOptionalId(initialArtistId);
        setArtistFilterBoxes(
            (artists || []).map((t) =>
                createFilterBox(
                    a != null && t.artist_id === a,
                    FILTER_TYPES.ARTIST,
                    t.artist_id,
                    t.artist_name
                )
            )
        );
    }, [artists, initialArtistId, setArtistFilterBoxes]);

    useEffect(() => {
        const g = parseOptionalId(initialGenreId);
        setGenreFilterBoxes(
            (genres || []).map((t) =>
                createFilterBox(
                    g != null && t.genre_id === g,
                    FILTER_TYPES.GENRE,
                    t.genre_id,
                    t.genre_name
                )
            )
        );
    }, [genres, initialGenreId, setGenreFilterBoxes]);

    useEffect(() => {
        const a = parseOptionalId(initialArtistId);
        const g = parseOptionalId(initialGenreId);
        const browseKey = `${initialArtistId ?? ""}:${initialGenreId ?? ""}`;

        if (a == null && g == null) {
            if (lastBrowseKeyRef.current !== "") {
                lastBrowseKeyRef.current = "";
                setActiveFilterTags((prev) =>
                    prev.filter(
                        (t) => t.type !== FILTER_TYPES.ARTIST && t.type !== FILTER_TYPES.GENRE
                    )
                );
            }
            return;
        }

        const artistName = a != null ? (artists || []).find((x) => x.artist_id === a)?.artist_name : null;
        const genreName = g != null ? (genres || []).find((x) => x.genre_id === g)?.genre_name : null;
        if (a != null && !artistName) return;
        if (g != null && !genreName) return;

        setActiveFilterTags((prev) => {
            const rest = prev.filter((t) => {
                if (a != null && t.type === FILTER_TYPES.ARTIST) return false;
                if (g != null && t.type === FILTER_TYPES.GENRE) return false;
                return true;
            });
            const tags = [];
            if (a != null && artistName) {
                tags.push(createFilterTag(FILTER_TYPES.ARTIST, a, artistName));
            }
            if (g != null && genreName) {
                tags.push(createFilterTag(FILTER_TYPES.GENRE, g, genreName));
            }
            return [...rest, ...tags];
        });
        lastBrowseKeyRef.current = browseKey;
    }, [initialArtistId, initialGenreId, artists, genres, setActiveFilterTags]);
}
