import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useAuth } from "../../Auth/authProvider";
import { signOut, User } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useWatchList } from "../Context/watchListContext";

const Header: React.FC = () => {
	const { getWatchQuantity, openWatchList } = useWatchList();

	const nav = useNavigate();
	const user: User | null = useAuth(); // Using the User interface

	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleProfileClick = () => {
		setDropdownVisible(!isDropdownVisible);
	};

	return (
		<Box sx={{ flexGrow: 1 }} style={{ width: "100%" }}>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "#4CB9E7",
					justifyContent: "space-around",
					display: "flex",
				}}
			>
				<Toolbar>
					<ShowChartIcon sx={{ marginLeft: 5, fontSize: 30, marginRight: 2 }} />

					<Link to="/">
						<Button
							variant="outlined"
							size="large"
							component="div"
							sx={{ marginRight: 40, color: "white" }}
						>
							FINup
						</Button>
					</Link>

					{/* Check if user is authenticated before showing certain links */}
					{user && (
						<>
							<Link to="/crypto">
								<Button
									variant="text"
									sx={{ mr: 2, color: "white", backgroundColor: "0F2167" }}
								>
									Crypto
								</Button>
							</Link>

							<Link to="/stock">
								<Button
									variant="text"
									sx={{ mr: 2, color: "white", backgroundColor: "0F2167" }}
								>
									Stock
								</Button>
							</Link>

							<Link to="/about">
								<Button
									variant="text"
									sx={{ mr: 2, color: "white", backgroundColor: "0F2167" }}
								>
									About
								</Button>
							</Link>
							<Link to="/news">
								<Button
									variant="text"
									sx={{ mr: 2, color: "white", backgroundColor: "0F2167" }}
								>
									News
								</Button>
							</Link>
						</>
					)}

					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						{/* Show login button if user is not authenticated */}
						{!user && (
							<Link to="/login">
								<Button
									id="login_button"
									variant="contained"
									sx={{ backgroundColor: "#0F2167", color: "white" }}
								>
									Login
								</Button>
							</Link>
						)}

						{/* Show user information and profile options if user is authenticated */}
						{user && (
							<b style={{ color: "white", marginTop: 5 }}>
								{/* Add user information here if needed */}
							</b>
						)}

						{user && (
							<div onClick={openWatchList}>
								<span className="login-btn-pop">{getWatchQuantity}</span>
								<Tooltip title={user.email}>
									<IconButton>
										<Avatar onClick={handleProfileClick} />
									</IconButton>
								</Tooltip>

								{/* dropdown button onClick */}

								{/* {isDropdownVisible && (
									<div
										style={{
											position: "absolute",
											top: "60px", // Adjust the distance from the profile picture as needed
											right: "0",
											zIndex: 1,
										}}
									>
										<ul>
											<li>
												<Button
													id="login_button"
													variant="contained"
													sx={{
														height: 30,
														width: 100,
														backgroundColor: "black",
														color: "white",
														marginRight: 2,
													}}
													onClick={() => nav("/watchList")}
												>
													Profile
												</Button>
												<br />
											</li>
											<li>
												<Button
													id="login_button"
													onClick={handleLogout}
													variant="contained"
													sx={{
														height: 30,
														width: 100,
														backgroundColor: "black",
														color: "white",
														marginRight: 2,
														marginTop: 1,
													}}
												>
													LogOut
												</Button>
											</li>
										</ul>
									</div>
								)} */}
							</div>
						)}
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
