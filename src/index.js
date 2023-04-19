import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom"; // https://reactrouter.com/en/main/start/concepts

import Modal from './helpers/stuikit/Modal';
import { RULES } from './config'

import ErrorBoundary from './components/ErrorBoundary'
import PageWrapp from './components/PageWrapp';
import Auth from './containers/Auth';
import Start from './containers/Start';
// import Chart from './containers/Chart';
import Error404 from './containers/Error404';


import { AuthProvider, RequireAuth } from './containers/Auth/helpers';

import './assets/scss/main.scss';

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
					<AuthProvider>
						<Routes>
							<Route element={<PageWrapp />}>
								<Route path={RULES.auth} element={<Auth />} />

								<Route path={RULES.start} element={<RequireAuth><Start /></RequireAuth>} />
								{/* <Route path={RULES.chart} element={<RequireAuth><Chart /></RequireAuth>} /> */}

								<Route path="*" element={<Error404 />} />
							</Route>
						</Routes>

						<Modal />

					</AuthProvider>
				</BrowserRouter>
			</ErrorBoundary>
		</React.StrictMode>
	);
}



ReactDOM.createRoot(
	document.getElementById('root')
).render(<App />);
