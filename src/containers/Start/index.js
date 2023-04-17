import React from 'react';
// import { Link } from "react-router-dom";
// import { useAuth } from './../Auth/helpers'; 

// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';


export default function Start() {
	// const auth = useAuth();

	const cards = [{
		id: '1',
		name: 'Тепловой датчик',
		status: '1',
	}, {
		id: '2',
		name: 'Датчик ветра',
		status: '2',
	}, {
		id: '3',
		name: 'Элетрический датчик',
		status: '1',
	}, {
		id: '4',
		name: 'Датчик дыма',
		status: '2',
	}, {
		id: '5',
		name: 'Датчик качества кода',
		status: '1',
	}, {
		id: '6',
		name: 'Датчик шторма',
		status: '2',
	}, {
		id: '7',
		name: 'Дискретный датчик',
		status: '1',
	}, {
		id: '8',
		name: 'Датчик влажности',
		status: '2',
	}, {
		id: '9',
		name: 'Ректальный датчик',
		status: '3',
	}, {
		id: '10',
		name: 'Цифровой датчик',
		status: '1',
	}, {
		id: '11',
		name: 'Пожарный датчик',
		status: '2',
	}, {
		id: '12',
		name: 'Одномерный датчик',
		status: '1',
	}, {
		id: '13',
		name: 'Аналоговый датчик',
		status: '1',
	}, {
		id: '14',
		name: 'Одноступенчатый датчик',
		status: '1',
	}, {
		id: '15',
		name: 'Проводной датчик',
		status: '1',
	}, {
		id: '16',
		name: 'Индуктивный датчик',
		status: '1',
	}, {
		id: '17',
		name: 'Оптический датчик',
		status: '1',
	}, {
		id: '18',
		name: 'Потенциометрический датчик',
		status: '1',
	}, {
		id: '19',
		name: 'Датчик давления',
		status: '3',
	}, {
		id: '20',
		name: 'Датчик нагрузки',
		status: '2',
	}, {
		id: '21',
		name: 'Перепадомер',
		status: '3',
	}, {
		id: '22',
		name: 'Датчик гравитационных колебаний',
		status: '2',
	}, {
		id: '23',
		name: 'Радарный датчик',
		status: '1',
	}];

	return (
		<section className="cards">
			{cards.map(card => {
				return <div className={"cards__item _" + card.status}>
					<div className="cards__id">{card.id}</div>
					<div className="cards__name">{card.name}</div>
				</div>
			})}
		</section>
	);
}

/**
 *
 *        <div className="p-3">
 *            <div className="p-5 mb-4 bg-light rounded-3">
 *                <h1 className="header">Welcome To React-Bootstrap</h1>
 *
 *                <Link to="/chart">chart</Link>
 *
 *            </div>
 *        </div>
 *
 * */