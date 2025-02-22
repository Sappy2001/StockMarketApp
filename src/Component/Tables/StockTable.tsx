import React, { useEffect, useState } from "react";
import { getStockdata } from "../services/apiservices";
import {
	CircularProgress,
	Container,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StockTable = () => {
	const [stock, setStock] = useState([
		{ symbol: "", exchangeShortName: "", name: "", price: "" },
	]);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	const fetchStockData = async () => {
		setLoading(true);
		try {
			const res = await getStockdata();
			const sortedData = sortStocksByExchange(res.data);
			setStock(sortedData);
			setLoading(false);
		} catch (error) {
			console.log(error + "At Stock Table");
		}
	};
	useEffect(() => {
		fetchStockData();
	}, []);

	//this function gets the value whenever any event is triggered
	const handleChange = (event: any, value: any) => {
		setPage(value);
	};

	const sortStocksByExchange = (stocks: any) => {
		return stocks.sort((a: any, b: any) => {
			if (a.exchangeShortName === "NASDAQ" && b.exchangeShortName !== "NASDAQ")
				return -1;
			if (a.exchangeShortName !== "NASDAQ" && b.exchangeShortName === "NASDAQ")
				return 1;
			return 0;
		});
	};

	const handleSearch = () => {
		return stock.filter((st) => {
			return (
				st.exchangeShortName?.toLowerCase().includes(search) ||
				st.symbol?.toLowerCase().includes(search) ||
				st.name?.toLowerCase().includes(search)
			);
		});
	};

	return (
		<Container style={{ textAlign: "center", marginBottom: 50 }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: "15px",
				}}
			>
				<Typography variant="h6" style={{ margin: 18 }} component={"span"}>
					Top Stocks By Market Trends
				</Typography>
				<TextField
					variant="outlined"
					style={{ marginBottom: 20, width: "50%" }}
					label="Search for your stock"
					onChange={(e) => setSearch(e.target.value)}
					component={"span"}
				></TextField>
			</div>
			<TableContainer style={{ marginBottom: 15 }}>
				{loading ? (
					<CircularProgress />
				) : (
					<Table
						style={{
							backgroundColor: "#ffecd654",
							color: "white",
							overflow: "hidden",
						}}
					>
						<TableHead style={{ backgroundColor: "#3559E0" }}>
							<TableRow>
								{["EXCHANGE", "STOCK NAME", "COMPANY NAME", "PRICE"].map(
									(head: string) => (
										<TableCell
											style={{ color: "white", fontWeight: "600" }}
											key={head}
										>
											{head}
										</TableCell>
									)
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{/* Perform the search and then slice the result based on the current page */}
							{handleSearch()
								.slice((page - 1) * 10, (page - 1) * 10 + 10)
								.map((row, id) => (
									//could be clicked only if its NASDAQ
									<TableRow
										className="tableRow"
										key={id}
										onClick={
											row.exchangeShortName === "NASDAQ"
												? () => navigate(`/stock/${row.symbol}`)
												: undefined
										}
										style={{
											border: 0,

											backgroundColor: `${
												row.exchangeShortName === "NASDAQ"
													? "#bee4f3"
													: "initial"
											}`,
										}}
									>
										<TableCell
											component="th"
											style={{
												color: "black",
											}}
										>
											{row.exchangeShortName}
											{row.exchangeShortName !== "NASDAQ" ? (
												<div style={{ fontSize: 10, color: "red" }}>
													no data available
												</div>
											) : (
												""
											)}
										</TableCell>
										<TableCell align="left" style={{ color: "black" }}>
											{row.symbol}
										</TableCell>
										<TableCell align="left" style={{ color: "black" }}>
											{row.name}
										</TableCell>
										<TableCell align="right" style={{ color: "black" }}>
											&#x24;{row.price}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
			<Pagination
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
				color="primary"
				onChange={handleChange}
				// using ? check whether its empty
				// to Fixed set decimal places to 0
				//using Number to convert the string value to number
				count={Number((handleSearch()?.length / 10).toFixed(0))}
			/>
		</Container>
	);
};

export default StockTable;
