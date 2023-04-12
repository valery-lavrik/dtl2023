import React, { Component } from 'react';
import './index.scss';

export default class Loader extends Component {
	render() {

		const {
			title = ''
		} = this.props

		return (
			<div className="loader">
				Lodaing...
				{!!title && <div className="loader__title">{title}</div>}
			</div>
		);
	}
}