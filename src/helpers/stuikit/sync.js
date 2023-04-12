import $ from 'jquery';
import { getFromCache, saveToCache } from './cache'

function sync() {

	let state = {};

	const getState = (type) => {

		return state[type] || [];

	};

	const setState = (type, value = []) => {

		state[type] = value;

		return value;

	};

	const abort = (type, afterAbortCallback) => {

		getState(type).forEach((request) => {
			if (request.readyState !== 4 && request.abort) {
				request.abort();

				if (afterAbortCallback) afterAbortCallback()
			}

		});

		setState(type, []);

	};

	const add = (type, request) => {

		let exist = getState(type);

		exist.push(request);

		setState(type, exist);

	};

	const info = (type) => {

		let result = {
			active: 0,
			finished: 0
		};

		const state = getState(type);

		state.forEach((request) => {

			request.readyState === 4 ? result.finished++ : result.active++;

		});

		return result;

	};

	const fetch = async (options, type, abortRequest = true, afterAbortCallback = () => { }) => {

		if (abortRequest) abort(type, afterAbortCallback);

		if (options.dataType === 'REST') {

			options = $.extend(options, {
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(options.data)
			});

		} else if (options.method === 'FORM_DATA' || options.method === 'FORM_DATA_UPDATE') {

			options = $.extend(options, {
				method: options.method === 'FORM_DATA_UPDATE' ? 'PATCH' : 'POST',
				processData: false,
				contentType: false
			});

		}



		let cacheKey = encodeURIComponent(JSON.stringify(options)).replace(/\./g, '');
		if (cacheKey.length > 200)
			cacheKey = cacheKey.substring(0, 200);

		if (!!options && !!options.cacheDays) {
			const dataStorage = await getFromCache(cacheKey, null);
			if (!!dataStorage) {
				return new Promise((resolve) => resolve(dataStorage));
			}
		}


		let request = $.ajax(options);



		if (!!options && !!options.cacheDays) {
			request.then((result) => {
				if (!!result)
					saveToCache(cacheKey, result, options.cacheDays);
			});
		}


		add(type, request);

		return request;

	};

	return {
		fetch,
		abort,
		info
	};

}


export const addSession = (sync) => {

	let requestSessionId = {};
	const baseFetch = sync.fetch;

	sync.fetch = (options, ...args) => {

		if (options.data) {

			options.data.sessionIds = requestSessionId;

		}

		const request = baseFetch(options, ...args);

		request.then((resp) => {

			if (resp.sessionIds) requestSessionId = $.extend({}, requestSessionId, resp.sessionIds);

		});

		return request;

	};

};


export default sync;