import React from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from './../../containers/Auth/helpers';
import logo from './../../assets/img/logo.svg';
import BackgroundComponent from './../../components/BackgroundComponent';
import './index.scss';


export default function PageWrapp() {
	const auth = useAuth();
	let navigate = useNavigate();
	let location = useLocation();
	const isAuth = !!auth?.user?.bearer;


	return (
		<div>
			<header className="head">


				{/* Вот компанента которая должна быть на фоне только на экране авторизации */}
				{location.pathname === '/auth' && (
					<BackgroundComponent />
				)}

				<img src={logo} alt="logo" className="head__logo" />

				{!!isAuth ? (
					<div className="head__profile">
						<div className="head__name">{auth?.user?.fio}</div>
						<div className="head__logout" onClick={(e) => {
							e.preventDefault();
							auth.signout(() => navigate('/', { replace: true }));
						}}>Выйти
						</div>
					</div>
				) : ''}
			</header>
			<Outlet />
		</div>
	);
}