import React from 'react';
import { Link } from "react-router-dom";

export default function Start() {

	return (
		<div className={"page-main "}>
			START
			<br/>
			<Link to="/chart">chart</Link>
		</div>
	);
}