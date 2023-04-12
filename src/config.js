// import { createHashHistory } from 'history'

// export const HISTORY = {
// 	basename: '/',
// 	hashType: 'noslash',
// 	forceRefresh: false,
// }


// export const hashHistory = createHashHistory({
// 	basename: '/', // The base URL of the app (see below)
// 	hashType: 'noslash', // The hash type to use (see below)
// 	// A function to use to confirm navigation with the user (see below)
// 	getUserConfirmation: (message, callback) => callback(window.confirm(message))
// });


export const RULES = {
	start: "/",
	chart: "/chart",
	// flights: "/:locationFromId([A-ZА-Я]{2,3}):date([0-9]{4})/:locationToId([A-ZА-Я]{2,3}):backDate([0-9]{0,4})/A:adultsCount([0-9]{1})/C:childsCount([0-9]{1})/I:infantsCount([0-9]{1})/S:serviceClass([0-9]{1})",
	// passengers: "/:locationFromId([A-ZА-Я]{2,3}):date([0-9]{4})/:locationToId([A-ZА-Я]{2,3}):backDate([0-9]{0,4})/A:adultsCount([0-9]{1})/C:childsCount([0-9]{1})/I:infantsCount([0-9]{1})/S:serviceClass([0-9]{1})/:price([0-9]+)/:departureFlight([A-Za-zА-Яа-я0-9\-\;?]{1,50})(\/?):arrivalFlight([A-Za-zА-Яа-я0-9\-\;?]{0,50})(\/?)",
	// insurance: '/insurance/:paymentId([0-9]+)/:phone([0-9]+)(\/?)([a-zA-Z]?)(\/?)',
	// additional_services: '/additional-services/:paymentId([0-9]+)/:phone([0-9]+)(\/?)([a-zA-Z]?)(\/?)',
	// payMethods: '/pay-methods/:paymentId([0-9]+)/:phone([0-9]+)(\/?)([a-zA-Z]?)(\/?)',
	// flight: "/:locationFromId([A-ZА-Я]{2,3}):date([0-9]{4})/:locationToId([A-ZА-Я]{2,3}):backDate([0-9]{0,4})/A:adultsCount([0-9]{1})/C:childsCount([0-9]{1})/I:infantsCount([0-9]{1})/S:serviceClass([0-9]{1})/:price([0-9]+)/:departureFlight([A-Za-zА-Яа-я0-9\-\;?]{1,50})(\/?):arrivalFlight([A-Za-zА-Яа-я0-9\-\;?]{0,50})(\/?)",
	// delayPayPageWithEmail: "/:paymentId([0-9]+)/:email([a-zA-Z0-9@.]+)(\/?)([a-zA-Z]?)(\/?)",
	// secure_return: '/secure-return', // http://localhost:3000/?order_id=32068158#secure-return
	// success: '/success/:paymentId([0-9]+)/:phone([0-9]+)(\/?)([a-zA-Z]?)(\/?)',
}



const API_SERVER = 'https://api-avia.svyaznoy.travel/'
// const API_SERVER = 'http://api-avia/'

export const NEW_API_URLS = {
	eventLog: API_SERVER + 'event-log',
	// autocomplete: API_SERVER + 'autocomplete',
	// search: API_SERVER + 'search-v2',
	// makeBooking: API_SERVER + 'make-booking',
	// addServices: API_SERVER + 'add-services',
	// url_secure_back_v2: window.location.origin + window.location.pathname + '?order_id=%order_id%#secure-return',
}