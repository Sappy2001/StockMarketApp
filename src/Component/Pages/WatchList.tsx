import { Button, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import {
	deleteWatchListItem,
	getWatchListedData,
} from "../services/apiservices";
import { Card, Container } from "react-bootstrap";
import { useAuth } from "../../Auth/authProvider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const WatchList = () => {
	const [list, setList] = useState([]);
	const [itemRemoved, setItemRemoved] = useState("");
	const user = useAuth();

	const fetchWatchedData = async () => {
		try {
			const res = await getWatchListedData(user?.email);
			console.log(res);
			setList(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	//   useEffect(() => {}, [itemRemoved]);
	useEffect(() => {
		fetchWatchedData();
	}, [itemRemoved, list, user]);

	return (
		<div>
			<div className="watchList-head">
				<h3>Your WatchList:</h3> <span>{user?.email}</span>
			</div>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					margin: 15,
					justifyContent: "space-around",
				}}
			>
				{list
					?.filter((e: any) => e.email === user?.email)
					.map((item: any) => {
						if (item) {
							return (
								<>
									<Card
										className="cards"
										key={item.id}
										style={{
											width: 200,
											height: 200,
											margin: 10,
											backgroundColor: "#eeeeeeda",
										}}
									>
										<CardContent
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<span
												style={{
													position: "absolute",
													color: "red",
													left: 0,
												}}
												onClick={() => {
													setItemRemoved(item.symbol);
													deleteWatchListItem(item.id);
												}}
											>
												<DeleteForeverIcon />
											</span>
											<span
												style={{
													position: "absolute",
													backgroundColor: "#4cb9e7",
													color: "white",
													fontWeight: 600,
													top: 0,
													right: 0,
													padding: "0 4px",
													borderRadius: 6,
												}}
											>
												{item.data.type}
											</span>
											<Button
												sx={{ fontSize: 14, marginTop: 2 }}
												color="primary"
											>
												{item.symbol}
											</Button>
											<div
												className="newsImage"
												style={{ width: "50%", height: "70%" }}
											>
												<img
													src={item.data.image}
													alt=""
													style={{ width: "100%", height: "100%" }}
													onError={(e) => {
														//as img tag is created with react -currentTarget is  better  targets the element in which event occured
														e.currentTarget.src =
															"https://cdn.worldvectorlogo.com/logos/stock.svg";
													}}
												/>
											</div>
										</CardContent>

										<Container
											style={{
												fontSize: 18,
												width: "100%",
												overflow: "hidden",
												display: "flex",
												justifyContent: "center",
											}}
										>
											{item.data.type === "stock"
												? "$"
												: item.data.price > 0
												? "+"
												: ""}
											{item.data.price}
										</Container>
									</Card>
								</>
							);
						} else return null;
					})}
			</div>
		</div>
	);
};

export default WatchList;
