import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { RULES, authRequest } from './../../config';
import { getCookie, setCookie } from './../../helpers/stuikit/cookie';



export const USER_KEY = 'USER_KEY_3';

// создание контекста для прокидывания хелпера авторизации во все нужные места
export let AuthContext = React.createContext(null);

// хук для получения юзера из контекста
export function useAuth() {
	return React.useContext(AuthContext);
}

// провайдер для оборачивания авторизационных компанент
export function AuthProvider({ children }) {
	let [user, setUser] = React.useState(null);


	// отправить мессадж в RN
	let sendToRN = (type, data) => {
		if (!!window?.ReactNativeWebView) {
			// window.WebViewBridge.onMessage(${JSON.stringify(data)});
			window.ReactNativeWebView.postMessage(JSON.stringify({
				location: window.location,
				type,
				...data
			}));
		}
	}



	let checkAuth = (success, error) => {
		let user = getCookie(USER_KEY, null);

		if (!!user) {
			try {
				user = JSON.parse(user);
			} catch (err) {
				error(err);
				return;
			}

			if (!!user) {
				setUser(user);
				// отправить мессадж в RN
				sendToRN('onAuth', { userId: user.login });
				success();
			} else {
				error();
			}
		} else {
			error();
		}
	}



	let signin = async (login, pass, remember, success, error) => {
		let USER = null;
		try {
			USER = await authRequest({
				login,
				pass
			});
		} catch (err) {
			return error(err);
		}

		setUser(USER);

		if (remember) {
			setCookie(USER_KEY, JSON.stringify(USER));
		}

		// отправить мессадж в RN
		sendToRN('onAuth', { userId: login });

		success();
	};



	let signout = (callback) => {
		setUser(null);
		setCookie(USER_KEY, null);
		callback();
	};



	let isAuth = () => {
		return !!user?.bearer;
	};

	let value = { user, signin, signout, checkAuth, isAuth };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



// Компанента для оборачивания страниц на которых обязательна авторизация
export function RequireAuth({ children }) {
	let auth = useAuth();
	let location = useLocation();

	if (!auth?.user?.bearer) {
		return <Navigate to={RULES.auth} state={{ from: location }} replace />;
	}

	return children;
}