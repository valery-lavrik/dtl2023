import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsExportData from 'highcharts/modules/export-data'
import HighchartsReact from 'highcharts-react-official'
import { useAuth } from './../Auth/helpers';
import { loadGraph } from './../../config';
// import DatePicker from 'react-datepicker'; // https://reactdatepicker.com/?ref=website-popularity



export default function Chart({
	device = null,
}) {
	const [msg, setMsg] = useState('');
	const [graph, setGraph] = useState(null);
	const auth = useAuth();

	useEffect(() => {
		HighchartsExporting(Highcharts);
		HighchartsExportData(Highcharts);
		load();
		// eslint-disable-next-line
	}, [])


	const load = async () => {
		let graph_ = null;

		setMsg('Загрузка...');

		try {
			graph_ = await loadGraph({ device });
		} catch (err) {
			console.log('err', err);
			setMsg('Не удалось загрузить информацию');
			return;
		}

		if (!graph_) {
			setMsg('Не удалось загрузить информацию.');
			return;
		}

		setGraph(graph_);
		setMsg('');
	}

	if (!auth.isAuth()) return null;

	if (!!msg) {
		return (
			<p style={{ textAlign: 'center' }}>{msg}</p>
		);
	}

	if (!!graph) {
		return (
			<HighchartsReact
				highcharts={Highcharts}
				options={graph}
			/>
		);
	}
}