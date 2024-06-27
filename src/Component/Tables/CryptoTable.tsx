import React, { useEffect, useState } from "react";
import { CoinList } from "../services/apiservices";
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
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const CryptoTable = () => {
	const navigate = useNavigate();
	const [hovered, setHovered] = useState(false);
	const [coins, setcoins] = useState([
		{
			price_change_percentage_24h: 0,
			image: "",
			name: "",
			symbol: "",
			current_price: "",
			market_cap: 0,
			id: "",
		},
	]);
	const [search, setSearch] = useState("");
	const [loading, setloading] = useState(false);
	const [page, setPage] = useState(1);

	const fetchcoins = async () => {
		setloading(true);
		try {
			const { data } = await CoinList("inr");
			setcoins(data);
			if (data) {
				setloading(false);
			}
		} catch (error) {
			console.log(error + "at fetchcoins");
		}
	};

	useEffect(() => {
		fetchcoins();
	}, []);
	const handleSearch = () => {
		return coins.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
			);
		});
	};

	const showList = () => {};

	const handleChange = (event: any, value: any) => {
		console.log(value);
		setPage(value);
	};
	return (
		<Container style={{ textAlign: "center" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: "15px",
				}}
			>
				<Typography variant="h6" style={{ margin: 18 }} component={"span"}>
					Top Crypto By Market Trends
				</Typography>
				<TextField
					variant="outlined"
					style={{ marginBottom: 20, width: "50%" }}
					label="Search for your crypto"
					onChange={(e) => {
						setSearch(e.target.value);
					}}
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
								{/* <TableCell>SYMBOL</TableCell>
            <TableCell align="right">STOCK NAME</TableCell>
            <TableCell align="right">COMPANY NAME</TableCell>
            <TableCell align="right">PRICE</TableCell> */}
								{["Coin", "Price", "24h change", "Market Cap"].map(
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
							{handleSearch()
								.slice((page - 1) * 10, (page - 1) * 10 + 10)
								.map((row, index) => {
									const profit = row.price_change_percentage_24h > 0;

									return (
										<TableRow
											className="tableRow"
											key={index}
											onMouseEnter={() => setHovered(true)}
											onClick={() => navigate(`/crypto/${row.id}`)}
										>
											<TableCell
												component="th"
												scope="row"
												style={{ display: "flex", gap: 15 }}
											>
												<img
													src={row.image}
													alt={row.name}
													height="50"
													style={{ marginBottom: 10 }}
												/>

												<div
													style={{
														display: "flex",
														flexDirection: "column",
														alignItems: "center",
													}}
												>
													<span
														style={{
															color: "blue",
															fontWeight: 500,
															textTransform: "uppercase",
														}}
													>
														{row.symbol}
													</span>
													<span style={{ color: "darkgrey", fontSize: 12 }}>
														{row.name}
													</span>
												</div>
												<div>
													<button
														className={`${
															hovered ? "popContainer" : "popContainer show"
														}`}
													>
														WatchList
													</button>
												</div>
											</TableCell>
											<TableCell
												style={{
													fontWeight: 600,
													fontSize: 16,
												}}
											>
												&#8377;{row.current_price}
											</TableCell>
											<TableCell
												style={{
													color: profit ? "#13e438" : "red",
													fontWeight: 600,
													fontSize: 20,
												}}
											>
												{profit && "+"} {row.price_change_percentage_24h}
											</TableCell>
											<TableCell
												style={{
													fontWeight: 600,
												}}
											>
												&#8377;
												{row.market_cap.toString().slice(0, -6)}M
											</TableCell>
										</TableRow>
									);
								})}
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

export default CryptoTable;
