import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { RULES } from './../../config';
import { getCookie, setCookie } from './../../helpers/stuikit/cookie';



const USER_KEY = 'USER_KEY_3';


export let AuthContext = React.createContext(null);

// хук для получения юзера
export function useAuth() {
	return React.useContext(AuthContext);
}


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
			} catch (error) {
				error();
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



	let signin = (login, pass, remember, success, error) => {

		// DEBUG
		const fakeUser = {
			fio: 'Иванов Иван Иваныч',
			login: 'admin',
			pass: '123',
			bearer: 'asdasd',
		}

		// eslint-disable-next-line
		if (login === fakeUser.login && pass == fakeUser.pass) {

			setTimeout(() => {
				setUser(fakeUser);

				if (remember) {
					setCookie(USER_KEY, JSON.stringify(fakeUser));
				}

				// отправить мессадж в RN
				sendToRN('onAuth', { userId: login });

				success();
			}, 2000);

		} else {
			error();
		}
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




export function RequireAuth({ children }) {
	let auth = useAuth();
	let location = useLocation();

	if (!auth?.user?.bearer) {
		return <Navigate to={RULES.auth} state={{ from: location }} replace />;
	}

	return children;
}