/**
 * Converts a notation to a slug.
 * @param notation
 */
export function slugify(notation: string) {
    return notation
        .toLowerCase()
        .replace(/\+/g, 'plus')
        .replace(/:/g, 'just')
        .replace(/~/g, 'next')
        .replace(/\W+/g, '');
}
