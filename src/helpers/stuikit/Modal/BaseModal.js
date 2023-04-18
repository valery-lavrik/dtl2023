import React, { Component } from 'react';
import Modal from '../Modal'

import './index.scss';

const MODAL_INITIAL = {
	children: null,
	className: '',
	close: () => { },
	title: '',
}

export default class BaseModal extends Component {

	static item = null

	constructor(props) {
		super(props)
		this.state = { modals: [] }
		BaseModal.item = this
	}


	static update(children, className = '', close = () => { }, title = '') {
		const { modals } = BaseModal.item.state;
		if (!children)
			return;

		modals.push({
			children,
			className,
			close,
			title,
		})

		BaseModal.item.setState({
			modals
		})
	}


	// получить последнюю модалку
	getLastModal() {
		const { modals } = this.state;
		return modals.length ? modals[modals.length - 1] : MODAL_INITIAL;
	}


	// удалить последнюю модалку из массива компанент
	closeLastModal() {
		const { modals } = BaseModal.item.state;
		const { close } = this.getLastModal();

		if (typeof close === 'function') close()

		modals.pop();

		BaseModal.item.setState({
			modals
		})
	}


	// удалить все модалки
	closeAllModal() {
		const { modals } = BaseModal.item.state;

		// нужно вызвать коллбек закрытия каждой модалки в обратном порядке
		for (let m = modals.length - 1; m >= 0; m--) {
			if (typeof modals[m].close === 'function')
				modals[m].close()
		}

		BaseModal.item.setState({
			modals: []
		})
	}



	static hide(hideAllModals = false) {
		if (hideAllModals)
			BaseModal.item.closeAllModal();
		else {
			if (BaseModal.item)
				BaseModal.item.closeLastModal();
		}
	}


	static len = () => BaseModal.item.state.modals.length || 0



	render() {

		if (!this.state.modals.length)
			return null;

		return (<>
			{this.state.modals.map((modal, key) => {
				const { className, children, close, title } = modal;

				return (
					<div key={key} className={'modal ' + className} >
						<div className="modal__box">

							{!!close && (
								<div className="modal__close" onClick={() => {
									BaseModal.item.closeLastModal();
									close();
									Modal.wrapperCloseHandler();
								}}>
									Закрыть
								</div>
							)}

							{!!title && <h2 className="modal__title">{title}</h2>}

							<div className="modal__content">
								{!!children && children}
							</div>
						</div>
					</div>
				);
			})}
		</>)


		// const { className, children, close, title } = this.getLastModal();

		// return (
		// 	<div className={'base-modal__over ' + className + (!!this.state.modals.length ? ' _open' : '')}>
		// 		<div className="base-modal">

		// 			{!!close && (
		// 				<button className="base-modal__close" onClick={() => {
		// 					BaseModal.item.closeLastModal();
		// 					close();
		// 					Modal.wrapperCloseHandler();
		// 				}}>
		// 				</button>
		// 			)}

		// 			{!!title && <h2 className="base-modal__title base-title _h2">{title}</h2>}

		// 			<div className="base-modal__content">
		// 				{!!children && children}
		// 				{/* {!!this.state.modals.length && (this.state.modals.map((modal) => modal.children))} */}
		// 			</div>
		// 		</div>
		// 	</div>
		// );
	}

}
