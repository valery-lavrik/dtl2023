/**
 * Возвращает правильное окончание для числительных
 * @memberOf module:_formats
 * @param  {Number} число
 * @param  {Array} варианты написания
 * @return {String} вариант, соотв. данному числу
 * @example os(1, ['час', 'часа', 'часов']); -> "час"
 * @example os(2, ['час', 'часа', 'часов']); -> "часа"
 * @example os(5, ['час', 'часа', 'часов']); -> "часов"
 */

const declOfNum = (num, expressions) => {
	let result = ''
	let count = num % 100

	if (count >= 5 && count <= 20) result = expressions['2']
	else {
		count %= 10

		if (count === 1) result = expressions['0']
		else if (count >= 2 && count <= 4) result = expressions['1']
		else result = expressions['2']
	}

	return result
}

export default declOfNum;
