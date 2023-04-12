/**
 *
 * @param {Array} arr - массив, состоящий из объектов
 * @param {Object} property - элемент массива
 */
export const indexOfObj = (arr, property) => {
    for (let i = 0, len = arr.length; i < len; i++) {
        let found = true

        for (const p in property) if (found && (arr[i][p] === undefined || arr[i][p] !== property[p])) found = false

        if (found) return i
    }
    return -1
}
