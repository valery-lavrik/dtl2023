export function pint(val) {
    // Унарный плюс нужен для преобразования пустой строки или null к 0, parseInt в этих случаях возвращает NaN
    return +parseInt(val, 10)
}

export function isInt(x) {
    if (x.trim() === '' || x === undefined || x === null) return false
    return /^[0-9]+$/.test(x)
}

export function toFix(x, after = 2) {
    const floatX = parseFloat(x)

    if (floatX === pint(floatX)) return floatX
    return floatX.toFixed(after)
}
