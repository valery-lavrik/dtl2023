import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from './../Auth/helpers'; 

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';





export default function Start() {
	const [show, toggleShow] = useState(true);
	const auth = useAuth();



	return (
		<Container className="p-3">
			<Container className="p-5 mb-4 bg-light rounded-3">
				<h1 className="header">Welcome To React-Bootstrap</h1>

				<Link to="/chart">chart</Link>

				<ExampleToast>
					We now have Toasts
					<span role="img" aria-label="tada">
						🎉
					</span>
				</ExampleToast>
			</Container>
		</Container>
	);
}





const ExampleToast = ({ children }) => {
	const [show, toggleShow] = useState(true);

	return (
		<>
			{!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
			<Toast show={show} onClose={() => toggleShow(false)}>
				<Toast.Header>
					<strong className="mr-auto">React-Bootstrap</strong>
				</Toast.Header>
				<Toast.Body>{children}</Toast.Body>
			</Toast>
		</>
	);
};


