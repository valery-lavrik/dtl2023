import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom"; // https://reactrouter.com/en/main/start/concepts

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
		<React.StrictMode>
			<ErrorBoundary>

				<BrowserRouter basename="/">
					<Routes>
						<Route path={RULES.start} element={<PageWrapp />}>
							<Route index element={<Start />} />
							<Route path={RULES.chart} element={<Chart />} />
							<Route path="*" element={<Error404 />} />
						</Route>
					</Routes>

					<Modal />

				</BrowserRouter>
			</ErrorBoundary>
		</React.StrictMode>
	);
}



ReactDOM.createRoot(
	document.getElementById('root')
).render(<App />);
