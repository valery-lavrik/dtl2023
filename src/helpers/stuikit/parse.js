import moment from 'moment'

export function parseDate(dateStr, format = 'DD.MM.YYYY') {
	let temp = !!dateStr ? moment(dateStr, 'DDMM') : ''; // "2210"

	if (!!temp && temp < moment().startOf('day')) temp = temp.add(1, 'y');
	if (!!temp) temp = temp.format(format);

	return temp;
}