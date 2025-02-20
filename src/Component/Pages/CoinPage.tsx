import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	HistoricalCoinChart,
	SingleCoin,
	addToWatchList,
} from "../services/apiservices";
import "./stockpage.css";
import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	Typography,
} from "@mui/material";

import { LineComponent } from "./LineComponent";
import { useAuth } from "../../Auth/authProvider";
import { useWatchList } from "../Context/watchListContext";

//defining the type of button -string not accpted by mui

const CoinPage = () => {
	const nav = useNavigate();
	const { fetchWatchedData } = useWatchList();
	// getting the data from authprovider by useContext
	const user = useAuth();
	console.log(user);
	const handleButtonClick = (buttonType: string) => {
		setButtonInfo(buttonType);
	};

	//setting initial button info
	const [buttonInfo, setButtonInfo] = useState("1");
	//getting symbol from routing link
	const { id } = useParams();
	const [coin, setCoin] = useState({
		tickers: {},
		genesis_date: "",
		image: {
			large: "",
		},
		symbol: "",
		description: {
			en: "",
		},
		market_data: {
			total_supply: "",
			market_cap_change_24h: 0,
		},
		id: "",
		market_cap_rank: 0,
	});
	const [loading, setloading] = useState(false);

	const [chartData, setChartData] = useState({ prices: [] });

	const getCoinData = async () => {
		try {
			const { data } = await SingleCoin(id);
			console.log(data);
			setCoin(data);
		} catch (err) {
			console.log(err);
		}
	};

	const fetchHistoricData = async () => {
		setloading(true);
		try {
			const { data } = await HistoricalCoinChart(`${id}`, buttonInfo, "inr");
			setChartData(data);
			setloading(false);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(coin);
	console.log(chartData);
	useEffect(() => {
		getCoinData();
		fetchHistoricData();
	}, [buttonInfo]);

	const coinChartData = {
		date: chartData.prices?.map((coin: any) => {
			let date = new Date(coin[0]);
			return date.toLocaleDateString();
		}),
		time: chartData.prices?.map((coin: any) => {
			let date = new Date(coin[0]);
			let time =
				date.getHours() > 12
					? `${date.getHours() - 12}:${date.getMinutes()}PM`
					: `${date.getHours()}:${date.getMinutes()}AM`;
			return `${time}`;
		}),
		price: chartData.prices?.map((coin: any) => coin[1]),
		name: `${id}`,
		userTime: buttonInfo,
	};

	const coinData = {
		type: "crypto",
		price: coin.market_data.market_cap_change_24h,
		image: coin.image.large,
	};
	const watchListFunction = async () => {
		const res = await addToWatchList(user?.email, id, coinData);
		if (res) fetchWatchedData();
	};
	return (
		<div className="stockpage">
			<div className="leftbar">
				<div
					className="bar-image"
					style={{ marginBottom: 20, backgroundColor: "black" }}
				>
					<img src={coin?.image.large} alt={coin?.id} height="200" />
				</div>
				<div className="companyinfo">
					<Typography variant="h3">{coin?.symbol}</Typography>
					<Card sx={{ minWidth: " 80%", borderLeft: 2.5, borderTop: 1.5 }}>
						<CardContent>
							<Typography variant="h4" component="div">
								{coin?.id}
							</Typography>
							<Typography variant="h6">
								Market Rank:{coin?.market_cap_rank}
							</Typography>
							<Typography variant="h6">
								volume:{Number(coin?.market_data.total_supply).toFixed(0)}
							</Typography>
							<Typography
								style={{
									fontSize: "15px",
									fontWeight: 500,
									color:
										coin?.market_data.market_cap_change_24h > 0
											? "#0fd90f"
											: "red",
								}}
							>
								{coin?.market_data.market_cap_change_24h}
							</Typography>
							<Typography style={{ fontSize: "15px", fontWeight: 500 }}>
								Launced on:{coin?.genesis_date}
							</Typography>

							{/* <Typography variant="body2">{coin?.phone}</Typography> */}
						</CardContent>
					</Card>
					<Typography variant="subtitle1" className="desc">
						{coin?.description.en}
					</Typography>
				</div>
			</div>
			<div className="rightbar">
				{loading ? (
					<CircularProgress
						style={{ color: "#2196f3" }}
						size={250}
						thickness={2}
					/>
				) : (
					<div className="chart-container">
						<LineComponent chartData={coinChartData} />
						<div className="chartButton">
							<Button
								variant={buttonInfo === "1" ? "outlined" : "contained"}
								onClick={() => {
									handleButtonClick("1");
								}}
							>
								Hourly
							</Button>
							<Button
								variant={buttonInfo === "15" ? "outlined" : "contained"}
								onClick={() => {
									handleButtonClick("15");
								}}
							>
								3hours
							</Button>

							<Button
								variant={buttonInfo === "30" ? "outlined" : "contained"}
								onClick={() => {
									handleButtonClick("30");
								}}
							>
								Daily
							</Button>

							<Button
								variant={buttonInfo === "210" ? "outlined" : "contained"}
								onClick={() => {
									handleButtonClick("210");
								}}
							>
								Weekly
							</Button>
						</div>

						{user ? (
							<Button
								variant="contained"
								color="error"
								onClick={() => {
									watchListFunction();
								}}
							>
								Add to WatchList
							</Button>
						) : (
							<></>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoinPage;
