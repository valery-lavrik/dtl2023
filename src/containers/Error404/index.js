import React from 'react';
import { Link } from "react-router-dom";


export default function Error404() {

	return (
		<div className={"page-main "}>
			Error404
			<Link to="/">Go to the home page</Link>
		</div>
	);
}