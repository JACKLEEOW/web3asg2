/** @returns {{ type: string, property: *, tagName: string }} */
export function createFilterTag(type, property, tagName) {
    return { type, property, tagName };
}

/** @returns {{ active: boolean, type: string, property: *, boxName: * }} */
export function createFilterBox(active, type, property, boxName) {
    return { active, type, property, boxName };
}
