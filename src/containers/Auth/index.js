import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from './helpers';



export default function Auth() {
	// const [validated, setValidated] = useState(false);
	const [status, setStatus] = useState('load');
	const [error, setError] = useState(false);
	let auth = useAuth();
	let navigate = useNavigate();
	let location = useLocation();
	let from = location.state?.from?.pathname || "/";


	useEffect(() => {
		auth.checkAuth(() => {
			navigate(from, { replace: true });
			setStatus('');
		}, () => {
			setStatus('');
		})
		// eslint-disable-next-line
	}, [])


	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();

		// if (event.currentTarget.checkValidity() === false) {
		// 	setValidated(true);
		// 	return;
		// }

		const formData = new FormData(event.currentTarget);
		const login = formData.get("login");
		const pass = formData.get("pass");
		const remember = formData.get("remember");

		setStatus('load');

		auth.signin(login, pass, remember, () => {
			navigate(from, { replace: true });
			setStatus('');
		}, () => {
			setError('Проверьте логин и пароль');
			setStatus('');
		});
	}




	return (
		<section className={"auth " + (status === 'load' ? '_preload' : '')}>
			<h2 className="auth__title">Авторизация</h2>
			<form className="auth__form" onSubmit={handleSubmit}>
				<label className="auth__label _text" htmlFor="form3Example3">
					<input type="text" className="auth__area" placeholder=" " id="form3Example3" name="login" />
					<span className="auth__desc">Логин / e-mail</span>
				</label>
				<label className="auth__label _text" htmlFor="form3Example4">
					<input type="password" className="auth__area" placeholder=" " id="form3Example4" name="pass" />
					<span className="auth__desc">Пароль</span>
				</label>
				{!!error && (
					<div role="alert" className="auth__error">{error}</div>
				)}
				<div className="auth__bottom">
					<label className="auth__label _submit">
						<button className="auth__submit">Войти</button>
					</label>
					<label className="auth__label auth__checkbox" htmlFor="form2Example33">
						<input type="checkbox" className="auth__checkbox-input" id="form2Example33"
							onChange={() => { }} name="remember" />
						<span className="auth__checkbox-desc">Запомнить</span>
					</label>
				</div>
			</form>
		</section>
	);


	// https://mdbootstrap.com/docs/standard/extended/login/#section-2
	/**

	 <section className="text-center">

	 <div className="p-5 bg-image" style={{
			backgroundImage: "url('" + logo + "')",
		}}></div>


	 <div className="card  shadow-5-strong" style={{
		}}>
	 <div className="card-body py-5 px-md-5">

	 <div className="row d-flex justify-content-center">
	 <div className="col-lg-10">
	 <h2 className="fw-bold mb-5">Авторизация</h2>
	 <form onSubmit={handleSubmit}>

	 <div className="form-outline mb-4">
	 <input name="login" type="text" className="form-control" />
	 <label className="form-label" >Логин / email:</label>
	 </div>

	 <div className="form-outline mb-4">
	 <input name="pass" type="password" id="form3Example4" className="form-control" />
	 <label className="form-label" >Пароль</label>
	 </div>



	 <div className="form-check d-flex justify-content-center mb-4">
	 <input name="remember" className="form-check-input me-2" type="checkbox" onChange={() => { }} />
	 <label className="form-check-label" htmlFor="form2Example33">
	 Запомнить
	 </label>
	 </div>


	 {!!error && (
								<div role="alert" className="fade alert alert-danger show">{error}</div>
							)}


	 <button type="submit" className="btn btn-primary btn-block mb-4">
	 Авторизоваться
	 </button>


	 </form>
	 </div>
	 </div>
	 </div>
	 </div>
	 </section>

	 */


	// return (
	// 	<section className="vh-100">
	// 		<div className="container py-5 h-100">
	// 			<div className="row d-flex justify-content-center align-items-center h-100">
	// 				<div className="col-12 col-md-8 col-lg-6 col-xl-5">
	// 					<div className="card shadow-2-strong" style={{ borderRadius: '1rem', backgroundColor: '#F8F9FA' }}>
	// 						<div className="card-body p-5 text-center">
	// 							<Form noValidate validated={validated} onSubmit={handleSubmit}>
	// 								<h3 className="mb-5">Авторизация</h3>

	// 								<FloatingLabel
	// 									controlId="floatingLogin"
	// 									label="Логин / email:"
	// 									className="mb-3"
	// 								>
	// 									<Form.Control name="login" type="text" placeholder="Логин / email:" required />
	// 								</FloatingLabel>

	// 								<FloatingLabel
	// 									controlId="floatingPassword"
	// 									label="Пароль:"
	// 									className="mb-3"
	// 								>
	// 									<Form.Control name="pass" type="password" placeholder="Пароль:" required />
	// 								</FloatingLabel>

	// 								<Form.Group className="d-flex justify-content-start mb-4" controlId="formBasicCheckbox">
	// 									<Form.Check name="remember" type="checkbox" label="Запомнить" />
	// 								</Form.Group>

	// 								<Button variant="primary" type="submit">
	// 									Авторизоваться
	// 								</Button>
	// 							</Form>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</section>
	// );


	//   return (
	// 	<Container className="p-5 bg-light rounded-3 col-md-8 offset-md-2">
	// 		<Form noValidate validated={validated} onSubmit={handleSubmit}>
	// 			<h1 className="header">Авторизация</h1>

	// 			<FloatingLabel
	// 				controlId="floatingLogin"
	// 				label="Логин / email:"
	// 				className="mb-3"
	// 			>
	// 				<Form.Control name="login" type="text" placeholder="Логин / email:" required />
	// 			</FloatingLabel>

	// 			<FloatingLabel
	// 				controlId="floatingPassword"
	// 				label="Пароль:"
	// 				className="mb-3"
	// 			>
	// 				<Form.Control name="pass" type="password" placeholder="Пароль:" required />
	// 			</FloatingLabel>

	// 			<Form.Group className="mb-3" controlId="formBasicCheckbox">
	// 				<Form.Check name="remember" type="checkbox" label="Запомнить" />
	// 			</Form.Group>

	// 			<Button variant="primary" type="submit">
	// 				Авторизоваться
	// 			</Button>

	// 		</Form>
	// 	</Container>
	// ); 
}


