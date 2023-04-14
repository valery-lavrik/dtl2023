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

	let value = { user, signin, signout, checkAuth };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}




export function RequireAuth({ children }) {
	let auth = useAuth();
	let location = useLocation();

	if (!auth.user) {
		return <Navigate to={RULES.auth} state={{ from: location }} replace />;
	}

	return children;
}