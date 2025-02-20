import React from "react";
import {
	WatchItem as WatchItemProps,
	useWatchList,
} from "../Context/watchListContext";
import watchListData from "../data/Localjson.json";
import { Button, Stack } from "react-bootstrap";
import { deleteWatchListItem } from "../services/apiservices";
import { useAuth } from "../../Auth/authProvider";

const watchListItems = watchListData.userData;

const WatchItem = ({ id, data, type }: WatchItemProps) => {
	const user = useAuth();
	const { removeFromWatch, getWatchQuantity } = useWatchList();
	if (watchListItems.length === 0) return null;
	return (
		<Stack direction="horizontal" gap={3} className="d-flex align-items-center">
			<img
				src={data.image}
				alt=""
				style={{ width: "125px", height: "75px", objectFit: "contain" }}
			/>
			<div className="me-auto">
				{data.symbol}

				<div className="text-muted" style={{ fontSize: "0.90rem" }}>
					${data.price}
				</div>
			</div>
			<div>
				<Button
					variant="danger"
					onClick={() => {
						deleteWatchListItem(id, user?.email);
						removeFromWatch(id);
					}}
				>
					Remove
				</Button>
			</div>
		</Stack>
	);
};

export default WatchItem;
