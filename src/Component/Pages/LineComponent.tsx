import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export function LineComponent(props: any) {
	const { chartData } = props;
	const { userTime, name } = chartData;
	const options = {
		responsive: true,
		plugins: {
			tooltip: {
				enabled: true,
				mode: "index" as const, // Display multiple items in a single tooltip
				intersect: false, // Allow tooltips to overlap data points
			},
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: `${name} Line Chart for ${userTime}`,
			},
		},
	};

	const data = {
		//to display data for first 30 elements only
		labels:
			userTime === "1day" || userTime === "30" || userTime === "210"
				? chartData.date
				: chartData.time,

		datasets: [
			{
				label: `${name}`,
				data: chartData.price,
				borderColor: "red",
				tension: 0.6,
				pointRadius: 1,
			},
		],
	};

	return <Line options={options} data={data} />;
}
