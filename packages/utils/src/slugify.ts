/**
 * Converts a notation to a slug.
 * @param notation
 */
export function slugify(notation: string, prefix = '') {
    const notationSlug = notation
        .toLowerCase()
        .replace(/\+/g, 'plus')
        .replace(/:/g, 'just')
        .replace(/~/g, 'next')
        .replace(/\W+/g, '');

    return prefix ? `${prefix}##${notationSlug}` : notationSlug;
}

/**
 * Converts a character name to a slug.
 * @param name
 */
export function slugifyCharacterName(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-');
}
