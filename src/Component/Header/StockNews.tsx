import React, { useEffect, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getStockNews } from "../services/apiservices";

// Interface for a stock item
interface StockItem {
	symbol: string;
	dayHigh: string;
	dayLow: string;
}

const StockNews = () => {
	const [stock, setStock] = useState<StockItem[]>([
		{
			symbol: "",
			dayHigh: "",
			dayLow: "",
		},
	]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Use a separate function to fetch stock data
		fetchStock();
	}, []);

	const fetchStock = async () => {
		try {
			const response = await getStockNews();
			setStock(response.data);
		} catch (error) {
			console.error("Error fetching stock data:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`stock-tab${loading ? "NotLoaded" : ""}`}>
			{loading ? (
				<div>
					<div className="spinner-grow text-primary" role="status"></div>
					<div className="spinner-grow text-secondary" role="status"></div>
					<div className="spinner-grow text-success" role="status"></div>
					<div className="spinner-grow text-danger" role="status"></div>
					<div className="spinner-grow text-warning" role="status"></div>
					<div className="spinner-grow text-info" role="status"></div>
					<div className="spinner-grow text-dark" role="status"></div>
				</div>
			) : (
				<div className="stock-slider">
					{stock.map((stockItem, index) =>
						index < 20 ? (
							<div key={index} className="stock-sections">
								{stockItem.symbol}
								<div id="uparrow">
									{" "}
									<ArrowDropUpIcon color="success" style={{ color: "green" }} />
									{stockItem.dayHigh}
								</div>
								<div id="downarrow">
									<ArrowDropDownIcon color="error" style={{ color: "red" }} />{" "}
									{stockItem.dayLow}
								</div>
							</div>
						) : null
					)}
				</div>
			)}
		</div>
	);
};

export default StockNews;
