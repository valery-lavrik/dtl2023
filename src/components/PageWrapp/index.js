import React from 'react';
import { Outlet } from "react-router-dom";



export default function PageWrapp() {
	return (
		<div className={"page-main "}>
			<main className="page-main__content">
				<Outlet />
			</main>
		</div>
	);
}