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


			{/* Вот компанента которая должна быть на фоне только на экране авторизации */}
			{location.pathname === '/auth' && (
				<BackgroundComponent />
			)}


			<div style={{ border: '1px solid red', background: '#bbbdbb' }}>

				<img alt="logo" src={logo} />
				<br />

				HEADER BLYAT!

				{!!isAuth ? (
					<div>
						<p>NAME: {auth?.user?.fio}</p>

						<p>
							<button onClick={(e) => {
								e.preventDefault();
								auth.signout(() => navigate('/', { replace: true }));
							}}>Выйти</button>
						</p>

					</div>
				) : (
					<div>
						Не авторизован
					</div>
				)}
			</div>
			<Outlet />
		</div >
	);
}