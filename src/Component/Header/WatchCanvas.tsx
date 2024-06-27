import React from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useWatchList } from "../Context/watchListContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
import WatchItem from "./WatchItem";

interface watchListProps {
	isOpen: boolean;
}
const WatchCanvas = ({ isOpen }: watchListProps) => {
	const { openWatchList, closeWatchList, watchItems } = useWatchList();
	const nav = useNavigate();
	const handleLogout = async () => {
		try {
			await signOut(auth);
			alert("Successfully Logged Out");
			nav("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
		closeWatchList();
	};
	return (
		<Offcanvas show={isOpen} onHide={closeWatchList} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>WatchList</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{watchItems.map((item) => {
						//sending all item data as props to WatchtItem
						return <WatchItem key={item.id} {...item} />;
					})}
				</Stack>
			</Offcanvas.Body>

			<Button
				id="login_button"
				variant="contained"
				style={{
					height: 30,
					width: 100,
					backgroundColor: "black",
					color: "white",
					margin: "5px auto",
					padding: "2px 0",
				}}
				onClick={() => nav("/watchList")}
			>
				Profile
			</Button>
			<Button
				id="login_button"
				onClick={handleLogout}
				variant="contained"
				style={{
					height: 30,
					width: 100,
					backgroundColor: "black",
					color: "white",
					margin: "5px auto",
					padding: "2px 0",
				}}
			>
				LogOut
			</Button>
		</Offcanvas>
	);
};

export default WatchCanvas;
