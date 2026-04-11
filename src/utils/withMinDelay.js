// Default minimum time loading UI stays visible when switching views (ms).
export const MIN_VIEW_LOAD_MS = 500;

/**
 * Resolves with `promise`'s value only after at least `minMs` has passed,
 * so fast network responses still show loading state briefly.
 */
export function withMinDelay(promise, minMs = MIN_VIEW_LOAD_MS) {
    const delay = new Promise((resolve) => setTimeout(resolve, minMs));
    return Promise.all([promise, delay]).then(([result]) => result);
}

// I know a thing or two about user experience - JACK