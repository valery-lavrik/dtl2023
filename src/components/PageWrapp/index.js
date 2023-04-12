import React from 'react';
import { Outlet } from "react-router-dom";
import './index.scss';

// import Container from 'react-bootstrap/Container';


export default function PageWrapp() {
	// return (
	// 	<Container>
	// 		<Outlet />
	// 	</Container>
	// );
	return (
		<Outlet />
	);
}