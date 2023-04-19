import React, { useState, useEffect } from 'react';
import Modal from './../../helpers/stuikit/Modal';
import Chart from './../Chart';
// import { Link } from "react-router-dom";
// import { useAuth } from './../Auth/helpers'; 

// import Toast from 'react-bootstrap/Toast';
// import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';



const cards = [{
	name: 'Тепловой датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Датчик ветра',
	status: '2',
	group: 'Цех 1',
}, {
	name: 'Элетрический датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Датчик дыма',
	status: '2',
	group: 'Цех 3',
}, {
	name: 'Датчик качества кода',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Датчик шторма',
	status: '2',
	group: 'Цех 2',
}, {
	name: 'Дискретный датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Датчик влажности',
	status: '2',
	group: 'Цех 2',
}, {
	name: 'Ректальный датчик',
	status: '3',
	group: 'Цех 1',
}, {
	name: 'Цифровой датчик',
	status: '1',
	group: 'Цех 3',
}, {
	name: 'Пожарный датчик',
	status: '2',
	group: 'Цех 1',
}, {
	name: 'Одномерный датчик',
	status: '1',
	group: 'Цех 2',
}, {
	name: 'Аналоговый датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Одноступенчатый датчик',
	status: '1',
	group: 'Цех 3',
}, {
	name: 'Проводной датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Индуктивный датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Оптический датчик',
	status: '1',
	group: 'Цех 3',
}, {
	name: 'Потенциометрический датчик',
	status: '1',
	group: 'Цех 1',
}, {
	name: 'Датчик давления',
	status: '3',
	group: 'Цех 3',
}, {
	name: 'Датчик нагрузки',
	status: '2',
	group: 'Цех 1',
}, {
	name: 'Перепадомер',
	status: '3',
	group: 'Цех 2',
}, {
	name: 'Датчик гравитационных колебаний',
	status: '2',
	group: 'Цех 1',
}, {
	name: 'Радарный датчик',
	status: '1',
	group: 'Цех 2',
}];




export default function Start() {
	const [selectTab, setSelectTab] = useState(null);
	const [tabs, setTabs] = useState([]);
	// const auth = useAuth();


	useEffect(() => {

		const tabs = [];
		for (let c = 0; c < cards.length; c++) {
			if (!tabs.includes(cards[c].group)) {
				tabs.push(cards[c].group)
			}
		}
		tabs.sort();

		setTabs(tabs);
		setSelectTab(tabs[0]);

	}, []);


	const onPress = (card) => {
		Modal.component(<Chart card={card} />, '', 'График «' + card.name + '»', () => { })
	}


	return (
		<>

			{/* ТАБЫ */}
			<nav className="tabs">
				<div className="tabs__name">Подразделения:</div>

				{tabs.map((t, k) => (
					<div
						key={k}
						className={'tabs__item ' + (t === selectTab ? '_selected' : '')}
						onClick={() => setSelectTab(t)}
					>
						{t}
					</div>
				))}
			</nav>


			{/* Блоки */}
			<section className="cards">
				{!!selectTab && cards.map((card, i) => {

					// Блоки из другого таба пропускаем
					if (card.group !== selectTab) {
						return null;
					}

					return (
						<div
							key={i}
							className={"cards__item _" + card.status}
							onClick={() => onPress(card)}
						>
							<div className="cards__id">{i + 1}</div>
							<div className="cards__name">{card.name}</div>
						</div>
					)
				})}
			</section>
		</>
	);
}