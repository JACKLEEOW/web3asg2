/**
 * Coerce browse URL query values to a finite number id, or null if missing/invalid.
 * @param {string | undefined | null} v
 * @returns {number | null}
 */
export function parseOptionalId(v) {
    if (v == null || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}
