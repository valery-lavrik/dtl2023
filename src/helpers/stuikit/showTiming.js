import declOfNum from './fixNumSuffix'
import { pint } from './pint';


const showTiming = (duration, dict = null) => {
	const hours = pint(duration / 60);
	const minutes = duration % 60;
	
	const dictDef = !!dict ? dict : {
		hoursTextsArray: [' час', ' часа', ' часов'],
		hoursShortTetx: 'ч',
		minutesShortText: 'м',
		minutesTextsArray: [' минута', ' минуты', ' минут']
	}

	const result =
		(hours !== 0 ? `${hours}${showTimeText(hours, minutes, dictDef.hoursTextsArray, dictDef.hoursShortTetx)}` : '')
		+ (minutes !== 0 ? ` ${minutes}${showTimeText(minutes, hours, dictDef.minutesTextsArray, dictDef.minutesShortText)}` : '')

	return result
}

const showTimeText = (term1, term2, wordsArray, shortText) => (!!term2 ? shortText : declOfNum(term1, wordsArray))


export default showTiming;