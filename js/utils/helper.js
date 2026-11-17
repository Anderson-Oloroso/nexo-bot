export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isEmpty(value) {
    return typeof value !== 'string' || value.trim().length === 0;
}

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
