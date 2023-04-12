import React from 'react';
import { createEvent } from '../helpers/loggers'




export default class ErrorBoundary extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			errors: null,
		}

		window.onerror = (msg, url, lineNo, columnNo, error) => {

			// ошибки которые не дают работать но не валят реакт
			this.log({
				isCritical: false,
				message: msg ?? null,
				url: url ?? null,
				lineNo: lineNo ?? null,
				columnNo: columnNo ?? null,
				userAgent: navigator?.userAgent,
				href: window.location?.href,
				stack: error?.stack ?? null,
			});

			return false;
		}

	}


	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			errors: null,
		}
	}

	componentDidCatch(error, errorInfo) {

		// Ошибки которые валят реакт
		this.log({
			isCritical: true,
			message: error?.message ?? null,
			name: error?.name ?? null,
			stack: error?.stack ?? null,
			userAgent: navigator?.userAgent,
			href: window.location?.href,
			componentStack: errorInfo?.componentStack ?? 'componentStack',
		});

		this.setState({
			errors: {
				error,
				errorInfo
			},
		})
	}



	log = (TRACE_INFO) => {
		if (process.env.NODE_ENV === 'production') {
			createEvent('js_error', TRACE_INFO);
		} else {
			// console.log('*****************');
			// console.log('TRACE_INFO', TRACE_INFO);
			// console.log('*****************');	
		}
	}


	render() {
		if (this.state.hasError) {
			const msg = this.state?.errors?.error?.message;

			return (
				<div className="block-error">
					<div className="block-error__title">Ой! Что-то пошло не так.</div>
					<div className="block-error__text">Приносим извинения, произошла ошибка. Мы уже знаем о ней и исправим в ближайшее время!</div>
					<div className="block-error__text">{msg}</div>
					<button className={`search__submit base-button`} onClick={() => window.location.reload()}>Попробовать еще раз</button>
				</div>
			)
		}

		return this.props.children
	}
}