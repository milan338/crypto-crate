// Adapted from https://github.com/mrdoob/three.js/blob/dev/src/animation/PropertyBinding.js
// Characters [].:/ are reserved for track binding syntax.
const _RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
const _reservedRe = new RegExp('[' + _RESERVED_CHARS_RE + ']', 'g');

export class PropertyBinding {
    /**
     * Replaces spaces with underscores and removes unsupported characters from
     * node names, to ensure compatibility with parseTrackName().
     *
     * @param {string} name Node name to be sanitized.
     * @return {string}
     */
    static sanitizeNodeName(name: string) {
        return name.replace(/\s/g, '_').replace(_reservedRe, '');
    }
}
