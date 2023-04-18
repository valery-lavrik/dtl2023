import React from 'react';
import BaseModal from './BaseModal';
import Loader from './../../../components/Loader';
import Button from './../../../components/Button';
import $ from 'jquery';
import LoadHtml from './LoadHtml'


// import loader_200_gif from '../../img/loader_200.gif';
// import loader_200_png from '../../img/loader_200.png';


export default class Modal extends BaseModal {


	static wrapperCloseHandler(onClose = () => { }, closeByOusideClick = true) {

		if (!BaseModal.item.state.modals.length) {

			$(document).off('keydown');
			$('body')
				.off('click', '.modal')
				.removeClass('bodyModalOpen');

		} else {
			if (!!onClose) {
				//	ESC click
				$(document).off('keydown').on('keydown', (e) => {
					if (e.keyCode === 27) {
						Modal.hide();
						if (!!onClose) onClose();
						Modal.wrapperCloseHandler();
					}
				});

				//	outside click
				if (closeByOusideClick) {
					$('body').addClass('bodyModalOpen').off('click').on('click', '.modal', (e) => {
						if (e.target && e.target.contains(e.currentTarget)) {
							Modal.hide();
							if (!!onClose) onClose();
							Modal.wrapperCloseHandler();
						}
					});
				} else {
					$('body').addClass('bodyModalOpen')
				}
			}
		}


	}



	static iframe(options, onLoad = (e) => { }, onClose = () => { }) {

		const props = {
			...options,
			onLoad: (e) => {
				e.currentTarget.parentNode.classList.remove('_loadingState');
				onLoad(e);
			}
		};

		Modal.update(
			<div className="iframe _loadingState">
				<Loader />
				<iframe title="modal" {...props} />
			</div>,
			'_iframe ' + options._class,
			onClose ?
				() => {
					onClose()
					Modal.wrapperCloseHandler(onClose);
				} : null
		);

		Modal.wrapperCloseHandler(onClose);
	}





	static loadHtml = (url = '', title = '', onClose = () => { }) => {

		Modal.update(
			<LoadHtml url={url} title={title} />,
			'_s900',
			onClose,
			title
		);

		Modal.wrapperCloseHandler(onClose);
	}


	static alert(msg, onClick = () => { }, onClose = () => { }, classname = '_s400', title = '') {

		Modal.update(
			[
				<div className="lk-form__block" key="modal__content">
					{msg}
				</div>,
				<div className="base-modal__buttons" key="modal__buttons">
					<div className="lk-form__block">
						<Button 
							rounded
							color={'primary'}
							key="modal__close__accept"
							onClick={() => {
								Modal.hide();
								onClick();
								Modal.wrapperCloseHandler(onClose);
						}}>Ок</Button>
					</div>
				</div>
			],
			`_alert ${classname}`,
			onClose,
			title
		);

		Modal.wrapperCloseHandler(onClose);
	}


	static alert2(msg = '', title = '', classname = '_s400', onClick = () => { }, onClose = () => { }) {
		Modal.alert(msg, onClick, onClose, classname, title)
	}


	static confirm(msg, title = '', onAccept = () => { }, onCancel = () => { }, onClose = () => { }, calssname = '_s400') {

		Modal.update(
			<React.Fragment>
				<div className="lk-form__block">
					{msg}
				</div>

				<div className="lk-enter__buttons base-modal__buttons">
						<Button rounded color={'primary'} onClick={() => {
							Modal.hide();
							Modal.wrapperCloseHandler(onClose);
							onAccept();
						}}>Ок</Button>
						<Button rounded onClick={() => {
							Modal.hide();
							Modal.wrapperCloseHandler(onClose);
							onCancel();
						}}>Отмена</Button>
				</div>
			</React.Fragment>,
			`_confirm ${calssname}`,
			onClose,
			title,
		);

		Modal.wrapperCloseHandler(onClose);
	}


	//	модалка загрузки...
	static loading(msg, onClose = () => { }, className = '_s300') {

		Modal.update(<Loader title={msg} />, className, onClose, '');

		Modal.wrapperCloseHandler(onClose);
	}


	static loaderWithoutModal() {
		$('body').addClass('bodyModalOpen base-preload _fixed _big-preloader');
	}


	static component(children, className = '', title = '', onClose = () => { }, closeByOusideClick = true) {
		Modal.wrapperCloseHandler(onClose, closeByOusideClick);
		BaseModal.update(children, className, onClose, title);
		Modal.wrapperCloseHandler(onClose, closeByOusideClick);
	}


	static hide(hideAllModals = false) {
		super.hide(hideAllModals)

		// Это для loaderWithoutModal
		if ($('._big-preloader').length) {
			$('body').removeClass('bodyModalOpen');
		}

		Modal.wrapperCloseHandler();
	}


	static len = () => BaseModal.len();
}