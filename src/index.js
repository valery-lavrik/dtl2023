import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";

import Modal from './helpers/stuikit/Modal';
import { RULES } from './config'

import ErrorBoundary from './components/ErrorBoundary'
import PageWrapp from './components/PageWrapp';
import Start from './containers/Start';
import Chart from './containers/Chart';
import Error404 from './containers/Error404';


import './assets/less/main.less';

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')


// не давать браузеру самому выставлять скролл при перезагрузке
if (window.history?.scrollRestoration) {
	window.history.scrollRestoration = 'manual';
}


function App() {
	return (
		<ErrorBoundary>
			<Routes>
				<Route path={RULES.start} element={<PageWrapp />}>
					<Route index element={<Start />} />
					{/* <Route path={RULES.chart} element={<Chart />} />
					<Route path="*" element={<Error404 />} /> */}
				</Route>
			</Routes>

			<Modal />

		</ErrorBoundary>
	);
}




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
