import React, { useState, useEffect } from 'react';
import Modal from './../../helpers/stuikit/Modal';
import Chart from './../Chart';
import { loadTabs } from './../../config';




export default function Start() {
	const [selectTab, setSelectTab] = useState(null);
	const [status, setStatus] = useState('load');
	const [tabs, setTabs] = useState([]);
	const [cards, setCards] = useState([]);

	useEffect(() => {
		load();
		// eslint-disable-next-line
	}, []);

	const load = async () => {
		let cards_ = null;

		try {
			cards_ = await loadTabs({});
		} catch (error) {
			setStatus('');
			return;
		}

		if (!cards_?.length) {
			setStatus('');
			return;
		}

		for (let c = 0; c < cards_.length; c++) {
			if (!tabs.includes(cards_[c].group)) {
				tabs.push(cards_[c].group)
			}
		}
		tabs.sort();

		setTabs(tabs);
		setCards(cards_);
		setSelectTab(tabs[0]);
		setStatus('');
	}


	const onPress = (device) => {
		Modal.component(<Chart device={device} />, '', 'График «' + device?.name + '»', () => { })
	}


	return (
		<div className={`_${status}`}>

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
		</div>
	);
}