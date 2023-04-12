import React from 'react';
import { Link } from "react-router-dom";
// import { useAuth } from './../Auth/helpers'; 

// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';





export default function Start() {
	// const auth = useAuth();



	return (
		<div className="p-3">
			<div className="p-5 mb-4 bg-light rounded-3">
				<h1 className="header">Welcome To React-Bootstrap</h1>

				<Link to="/chart">chart</Link>

			</div>
		</div>
	);
}

