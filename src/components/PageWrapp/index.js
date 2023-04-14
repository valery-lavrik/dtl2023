import React from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './../../containers/Auth/helpers';
import logo from './../../assets/img/logo.svg';
import './index.scss';



export default function PageWrapp() {
	const auth = useAuth();
	let navigate = useNavigate();
	const isAuth = !!auth?.user?.bearer;


	return (
		<div>
			<div style={{ border: '1px solid red', background: '#bbbdbb' }}>

				<img src={logo} />
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