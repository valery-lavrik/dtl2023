// import SYNC from './helpers/sync';
import Highcharts from 'highcharts'


export const RULES = {
	start: "/",
	auth: "/auth",
	chart: "/chart",
}

const API_SERVER = 'https://api-avia.svyaznoy.travel/'
// const API_SERVER = 'http://api-avia/'

export const NEW_API_URLS = {
	eventLog: API_SERVER + 'event-log',
}



// Запрос авторизации
export const authRequest = async (props) => {
	return new Promise((resolve, reject) => {

		console.log('props', props);

		// DEBUG
		const fakeUser = {
			fio: 'Иванов Иван Иваныч',
			login: 'admin',
			pass: '123',
			bearer: 'asdasd',
		}

		setTimeout(() => {
			if (fakeUser.login === props.login && fakeUser.pass === props.pass) {
				resolve(fakeUser);
			} else {
				reject();
			}
		}, 2000);
	});
}


// Загрузить список датчиков
export const loadTabs = async (props) => {
	return new Promise(async (resolve) => {

		console.log('props', props);

		// DEBUG
		const cards = [{
			name: 'Тепловой датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Датчик ветра',
			status: '2',
			group: 'Цех 1',
		}, {
			name: 'Элетрический датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Датчик дыма',
			status: '2',
			group: 'Цех 3',
		}, {
			name: 'Датчик качества кода',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Датчик шторма',
			status: '2',
			group: 'Цех 2',
		}, {
			name: 'Дискретный датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Датчик влажности',
			status: '2',
			group: 'Цех 2',
		}, {
			name: 'Ректальный датчик',
			status: '3',
			group: 'Цех 1',
		}, {
			name: 'Цифровой датчик',
			status: '1',
			group: 'Цех 3',
		}, {
			name: 'Пожарный датчик',
			status: '2',
			group: 'Цех 1',
		}, {
			name: 'Одномерный датчик',
			status: '1',
			group: 'Цех 2',
		}, {
			name: 'Аналоговый датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Одноступенчатый датчик',
			status: '1',
			group: 'Цех 3',
		}, {
			name: 'Проводной датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Индуктивный датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Оптический датчик',
			status: '1',
			group: 'Цех 3',
		}, {
			name: 'Потенциометрический датчик',
			status: '1',
			group: 'Цех 1',
		}, {
			name: 'Датчик давления',
			status: '3',
			group: 'Цех 3',
		}, {
			name: 'Датчик нагрузки',
			status: '2',
			group: 'Цех 1',
		}, {
			name: 'Перепадомер',
			status: '3',
			group: 'Цех 2',
		}, {
			name: 'Датчик гравитационных колебаний',
			status: '2',
			group: 'Цех 1',
		}, {
			name: 'Радарный датчик',
			status: '1',
			group: 'Цех 2',
		}];

		setTimeout(() => {
			resolve(cards);
		}, 2000);
	});
}


// Загрузить график
export const loadGraph = async (props) => {
	return new Promise(async (resolve) => {

		console.log('props', props);

		setTimeout(() => {


			const colors = Highcharts.getOptions().colors;
			const chart1 = {

				// чтоб спрятать уведомление
				accessibility: {
					enabled: false,
				},




				chart: {
					type: 'spline'
				},

				legend: {
					symbolWidth: 40
				},

				credits: {
					enabled: false
				},

				title: {
					text: 'Most common desktop screen readers'
				},

				subtitle: {
					text: 'Source: WebAIM. Click on points to visit official screen reader website'
				},

				yAxis: {
					title: {
						text: 'Percentage usage'
					},
					accessibility: {
						description: 'Percentage usage'
					}
				},

				xAxis: {
					title: {
						text: 'Time'
					},
					accessibility: {
						description: 'Time from December 2010 to September 2019'
					},
					categories: ['December 2010', 'May 2012', 'January 2014', 'July 2015', 'October 2017', 'September 2019']
				},

				tooltip: {
					valueSuffix: '%',
					stickOnContact: true
				},

				// plotOptions: {
				// 	series: {
				// 		point: {
				// 			events: {
				// 				click: function () {
				// 					window.location.href = this.series.options.website;
				// 				}
				// 			}
				// 		},
				// 		cursor: 'pointer'
				// 	}
				// },

				series: [
					{
						name: 'NVDA',
						data: [34.8, 43.0, 51.2, 41.4, 64.9, 72.4],
						website: 'https://www.nvaccess.org',
						color: colors[2],
						accessibility: {
							description: 'This is the most used screen reader in 2019.'
						}
					}, {
						name: 'JAWS',
						data: [69.6, 63.7, 63.9, 43.7, 66.0, 61.7],
						website: 'https://www.freedomscientific.com/Products/Blindness/JAWS',
						dashStyle: 'ShortDashDot',
						color: colors[0]
					}, {
						name: 'VoiceOver',
						data: [20.2, 30.7, 36.8, 30.9, 39.6, 47.1],
						website: 'http://www.apple.com/accessibility/osx/voiceover',
						dashStyle: 'ShortDot',
						color: colors[1]
					}, {
						name: 'Narrator',
						data: [null, null, null, null, 21.4, 30.3],
						website: 'https://support.microsoft.com/en-us/help/22798/windows-10-complete-guide-to-narrator',
						dashStyle: 'Dash',
						color: colors[9]
					}, {
						name: 'ZoomText/Fusion',
						data: [6.1, 6.8, 5.3, 27.5, 6.0, 5.5],
						website: 'http://www.zoomtext.com/products/zoomtext-magnifierreader',
						dashStyle: 'ShortDot',
						color: colors[5]
					}, {
						name: 'Other',
						data: [42.6, 51.5, 54.2, 45.8, 20.2, 15.4],
						website: 'http://www.disabled-world.com/assistivedevices/computer/screen-readers.php',
						dashStyle: 'ShortDash',
						color: colors[3]
					}
				],

				responsive: {
					rules: [{
						condition: {
							maxWidth: 550
						},
						chartOptions: {
							chart: {
								spacingLeft: 3,
								spacingRight: 3
							},
							legend: {
								itemWidth: 150
							},
							xAxis: {
								categories: ['Dec. 2010', 'May 2012', 'Jan. 2014', 'July 2015', 'Oct. 2017', 'Sep. 2019'],
								title: ''
							},
							yAxis: {
								visible: false
							}
						}
					}]
				}
			}


			resolve(chart1);
			// reject();
		}, 2000);
	});
}