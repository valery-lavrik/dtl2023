
export const CURRENCIES = {
	rur: {
		symbol: '₽',
	},
	kzt: {
		symbol: '₸',
	},
}



export default function priceFormat(price, currency = 'rur') {

	let cur = currency.toLowerCase()
	if (cur === 'rub') cur = 'rur';
	if (!Object.keys(CURRENCIES).includes(cur)) cur = 'rur'

	return `${price}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ').concat(' ' + CURRENCIES[cur].symbol);
}
