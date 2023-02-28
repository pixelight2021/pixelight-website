export function map(v, min1, max1, min2, max2) {
    return (v - min1) * (max2 - min2) / (max1 - min1) + min2
}

export function easeOut(v, min1, max1, min2, max2) {
    return (1 - Math.pow(1 - ((v - min1) / (max1 - min1)), 3)) * (max2 - min2) + min2
}