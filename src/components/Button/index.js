import React, { Component } from 'react';
import './index.scss';

export default class Button extends Component {
	render() {

		const {
			children,
			href,
			rounded,
			shadowed,
			sizes = {
				small: '_small',
				medium: '_medium',
				large: '_large',
			},
			size = 'medium',
			colors = {
				gray: '_gray',
				primary: '_primary',
				green: '_green',
				white: '_white',
			},
			color = 'gray',
			themes = {
				default: '',
				breadcrumb: '_breadcrumb',
			},
			theme = 'default',
			onClick = () => { }
		} = this.props;

		return (
			<>
				{!!href && (
					<a href={href} onClick={onClick} className={'button' + (!!rounded ? ' _rounded' : '') + (!!shadowed ? ' _shadowed' : '') + (!!size ? ' ' + sizes[size] : '') + (!!color ? ' ' + colors[color] : '') + (!!theme ? ' ' + themes[theme] : '')}>{children}</a>
				)}
				{!href && (
					<button onClick={onClick} className={'button' + (!!rounded ? ' _rounded' : '') + (!!shadowed ? ' _shadowed' : '') + (!!size ? ' ' + sizes[size] : '') + (!!color ? ' ' + colors[color] : '') + (!!theme ? ' ' + themes[theme] : '')}>{children}</button>
				)}
			</>
		);
	}
}