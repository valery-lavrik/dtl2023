import React from 'react';
import { Outlet } from "react-router-dom";
import './index.scss';



export default function PageWrapp() {
	return (
		<div className="page-main">
			<p>test - scss red</p>
			WRAPP
			<div className="test-scss">
				<p>test - scss blue</p>
			</div>
			<br />
			<main className="page-main__content">
				<Outlet />
			</main>
		</div>
	);
}