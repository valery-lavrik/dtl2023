// Парсим URL на состовляющие
export const parseURL = (url) => {
	url = url || document.location.href;

	//убираем хэш
	url = url.split('#')[0];

	let result = {};
	const pattern = '^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$';
	const rx = new RegExp(pattern);
	const parts = rx.exec(url);

	const params_str = url.split('?')[1];
	let params_obj = {};

	if (params_str) {
		params_obj = params_str
			.replace(/(^\?)/, '')
			.split('&')
			.map(
				function (n) {
					n = n.split('=');
					this[n[0]] = n[1];

					return this;
				}.bind({})
			)[0]; //	Параметры урла
	}

	result.href = parts[0] || '';
	result.protocol = parts[1] || '';
	result.hostname = parts[5] || '';
	result.port = parts[6] || '';
	result.pathname = parts[7] || '/';
	result.search = parts[8] || '';
	result.hash = parts[10] || '';
	result.url = result.protocol + '//' + result.hostname + result.pathname;
	result.params = params_obj; //	Параметры урла

	return result;
}
