import React from 'react';
import Modal from './../../helpers/stuikit/Modal';
import Chart from './../Chart';
// import { Link } from "react-router-dom";
// import { useAuth } from './../Auth/helpers'; 

// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';


export default function Start() {
	// const auth = useAuth();

	const cards = [{
		name: 'Тепловой датчик',
		status: '1',
	}, {
		name: 'Датчик ветра',
		status: '2',
	}, {
		name: 'Элетрический датчик',
		status: '1',
	}, {
		name: 'Датчик дыма',
		status: '2',
	}, {
		name: 'Датчик качества кода',
		status: '1',
	}, {
		name: 'Датчик шторма',
		status: '2',
	}, {
		name: 'Дискретный датчик',
		status: '1',
	}, {
		name: 'Датчик влажности',
		status: '2',
	}, {
		name: 'Ректальный датчик',
		status: '3',
	}, {
		name: 'Цифровой датчик',
		status: '1',
	}, {
		name: 'Пожарный датчик',
		status: '2',
	}, {
		name: 'Одномерный датчик',
		status: '1',
	}, {
		name: 'Аналоговый датчик',
		status: '1',
	}, {
		name: 'Одноступенчатый датчик',
		status: '1',
	}, {
		name: 'Проводной датчик',
		status: '1',
	}, {
		name: 'Индуктивный датчик',
		status: '1',
	}, {
		name: 'Оптический датчик',
		status: '1',
	}, {
		name: 'Потенциометрический датчик',
		status: '1',
	}, {
		name: 'Датчик давления',
		status: '3',
	}, {
		name: 'Датчик нагрузки',
		status: '2',
	}, {
		name: 'Перепадомер',
		status: '3',
	}, {
		name: 'Датчик гравитационных колебаний',
		status: '2',
	}, {
		name: 'Радарный датчик',
		status: '1',
	}];


	const onPress = (card) => {
		Modal.component(<Chart card={card} />, '_s600', 'График ' + card.name, () => { })
	}


	return (
		<>

			{/* ТАБЫ */}
			<nav className="tabs">
				Подразделения:
				<div className="tabs__item">Цех 1</div>
				<div className="tabs__item _selected">Цех 2</div>
				<div className="tabs__item">Цех 3</div>
			</nav>


			<section className="cards">
				{cards.map((card, i) => (
					<div
						key={i}
						className={"cards__item _" + card.status}
						onClick={() => onPress(card)}
					>
						<div className="cards__id">{i + 1}</div>
						<div className="cards__name">{card.name}</div>
					</div>
				))}
			</section>
		</>
	);
}