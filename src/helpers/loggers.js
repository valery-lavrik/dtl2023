import { NEW_API_URLS } from '../config';
import SYNC from './sync';
import _ from 'lodash';


export const createEvent = (name = '', data = null) => {
	return SYNC.fetch({
		url: NEW_API_URLS.eventLog,
		type: 'POST',
		data: {
			name: name,
			data: _.isString(data) ? data : JSON.stringify(data)
		}
	},
		'createEvent',
		false
	);
}
