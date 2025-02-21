import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	addToWatchList,
	getCompanyInfo,
	historicalStockData,
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

const StockPage = () => {
	const user = useAuth();
	const nav = useNavigate();
	const { fetchWatchedData } = useWatchList();
	const handleButtonClick = (buttonType: string) => {
		setButtonInfo(buttonType);
	};

	//setting initial button info
	const [buttonInfo, setButtonInfo] = useState("5min");
	//getting symbol from routing link
	const { id } = useParams();
	const [stock, setStock] = useState([
		{
			image: "",
			symbol: "",
			description: "",
			companyName: "",
			country: "",
			industry: "",
			phone: "",
			price: "",
		},
	]);
	const [loading, setloading] = useState(false);

	const [chartData, setChartData] = useState([{ date: "" }]);

	//merging above two api calls with Promise.all
	const fetchData = async () => {
		setloading(true);
		try {
			const [comapanyData, historicData] = await Promise.all([
				getCompanyInfo(id),
				historicalStockData(buttonInfo, `${id}`),
			]);
			setStock(comapanyData.data);
			setChartData(historicData.data);
		} catch (err) {
			console.log("error fetching data", err);
		} finally {
			setloading(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, [id, buttonInfo]);

	const stockData = {
		type: "stock",
		price: stock[0]?.price,
		image: stock[0]?.image,
	};

	//---------------object for chartData-----------//

	const stockChartData = {
		date: chartData?.slice(0, 20).map((stock: any) => {
			//checking if stock and stock date is present then only show the chart

			if (stock && stock.date) {
				//spliting the date and time in array and getting the date info
				let date = stock.date.split(" ")[0];
				return `${date}`;
			} else return "";
		}),
		time: chartData?.slice(0, 20).map((stock: any) => {
			//checking if stock and stock date is present then only show the chart
			if (stock && stock.date) {
				//spliting first the date and  then time  hrs then converting it in 12hr format
				let time =
					stock.date.split(" ")[1].split(":")[0] > 12
						? `${stock.date.split(" ")[1].split(":")[0] - 12}:${
								stock.date.split(" ")[1].split(":")[1]
						  }PM`
						: `${stock.date.split(" ")[1].split(":")[0]}:${
								stock.date.split(" ")[1].split(":")[1]
						  }AM`;
				return `${time}`;
			}
		}),
		price: chartData?.slice(0, 20).map((stock: any) => stock?.close),
		name: id,
		userTime: buttonInfo,
	};
	const watchListFunction = async () => {
		const res = await addToWatchList(user?.email, id, stockData);
		if (res) fetchWatchedData();
	};
	return (
		<div className="stockpage">
			<div className="leftbar">
				<div
					className="bar-image"
					style={{ marginBottom: 20, backgroundColor: "black" }}
				>
					<img
						src={stock[0]?.image}
						alt={stock[0]?.symbol}
						height="200"
						onError={(e) => {
							//as img tag is created with react -currentTarget is  better  targets the element in which event occured
							e.currentTarget.src =
								"https://cdn.worldvectorlogo.com/logos/stock.svg";
						}}
					/>
				</div>
				<div className="companyinfo">
					<Typography variant="h3">{stock[0]?.symbol}</Typography>
					<Card sx={{ minWidth: " 80%", borderLeft: 2.5, borderTop: 1.5 }}>
						<CardContent>
							<Typography variant="h4" component="div">
								{stock[0]?.companyName}
							</Typography>
							<Typography variant="h6">
								{stock[0]?.country}
								<br />${stock[0]?.price}
							</Typography>
							<Typography variant="h6">{stock[0]?.industry}</Typography>
							<Typography variant="body2">{stock[0]?.phone}</Typography>
						</CardContent>
					</Card>
					<Typography variant="subtitle1" className="desc">
						{stock[0]?.description}
					</Typography>
				</div>
				{/* <Button variant="contained" color="error">
          Add to WatchList
        </Button> */}
			</div>
			<div className="rightbar">
				{chartData.length > 0 ? (
					loading ? (
						<CircularProgress
							style={{ color: "#2196f3" }}
							size={250}
							thickness={2}
						/>
					) : (
						<div className="chart-container">
							<LineComponent chartData={stockChartData} />

							<div className="chartButton">
								<Button
									variant={buttonInfo === "5min" ? "outlined" : "contained"}
									onClick={() => {
										handleButtonClick("5min");
									}}
								>
									5Mins
								</Button>
								<Button
									variant={buttonInfo === "15min" ? "outlined" : "contained"}
									onClick={() => {
										handleButtonClick("15min");
									}}
								>
									15Mins
								</Button>
								<Button
									variant={buttonInfo === "1hour" ? "outlined" : "contained"}
									onClick={() => {
										handleButtonClick("1hour");
									}}
								>
									Hourly
								</Button>

								<Button
									variant={buttonInfo === "1day" ? "outlined" : "contained"}
									onClick={() => {
										handleButtonClick("1day");
									}}
								>
									Daily
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
					)
				) : (
					<div
						style={{
							height: "100%",
							display: "flex",
							alignItems: "center",
						}}
					>
						<img
							src="https://www.kpriet.ac.in/asset/frontend/images/nodata.png"
							width="100%"
							alt=""
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default StockPage;
