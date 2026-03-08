export const hbsHelpers = {
    eq: (a, b) => String(a) === String(b),
    range: (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start)
};