import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { RULES } from './../../config';


// чтоб разлогиниться надо
// auth.signout(() => navigate("/"));


export let AuthContext = React.createContext(null);

// хук для получения юзера
export function useAuth() {
	return React.useContext(AuthContext);
}


export function AuthProvider({ children }) {
	let [user, setUser] = React.useState(null);


	let checkAuth = () => {
		console.log('checkAuth');
		// if () {
		// 	setUser()
		// }
	}

	let signin = (login, pass, remember, success, error) => {

		console.log('signin newUser', login, pass, remember);
		error();
		// return fakeAuthProvider.signin(() => {
		// 	setUser(newUser);
		// 	callback();
		// });
	};

	let signout = (callback) => {
		setUser(null);
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