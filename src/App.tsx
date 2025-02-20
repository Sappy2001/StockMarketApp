import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import { getNewsData } from "./Component/services/apiservices";
import Header from "./Component/Header/header";
import Footer from "./Component/Footer/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StockPage from "./Component/Pages/StockPage";
import { AuthProvider, useAuth } from "./Auth/authProvider";
import CoinPage from "./Component/Pages/CoinPage";
import WatchList from "./Component/Pages/WatchList";
import { WatchListProvider } from "./Component/Context/watchListContext";
import StockNews from "./Component/Header/StockNews";
import Dashboard from "./Component/Dashboard/Dashboard";
import NewsContainer from "./Component/NewsContainer/NewsContainer";
import StockTable from "./Component/Tables/StockTable";
import CryptoTable from "./Component/Tables/CryptoTable";

//Lazy loading with dynamic import() for secondary routes
const Login = React.lazy(() => import("./Component/Login/login"));
const Signup = React.lazy(() => import("./Component/Signup/signup"));
const About = React.lazy(() => import("./Component/Header/about"));

// Interface for a news article
interface NewsItem {
	source: {
		name: string;
	};
	urlToImage: string;
	title: string;
	url: string;
}

function App() {
	//you have to intialize and declare the values,or else it will give you error passing props

	const [news, setNews] = useState<NewsItem[]>([
		{
			source: { name: "" },
			urlToImage: "",
			title: "",
			url: "",
		},
	]);

	const user = useAuth();

	// Function to fetch news data

	const fetchNewsData = async () => {
		try {
			const response = await getNewsData();

			// Handle success
			if (response.status === 200) {
				setNews(response.data.articles);
			}
		} catch (error) {
			// Handle error
			console.error("Error fetching news data:", error);
		}
	};

	useEffect(() => {
		// Fetch news data on component mount
		fetchNewsData();
	}, []);

	return (
		<>
			<BrowserRouter>
				{/* used context for user info in Auth provider */}
				<AuthProvider>
					{/* for providing context to all the components */}
					<WatchListProvider>
						{/* StockNews and Header components */}

						<StockNews />

						<Header />

						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route
								path="/stock"
								element={<StockTable />}
								loader={() => import("./Component/Tables/StockTable")} // Preload on hover or interaction
							/>
							<Route
								path="/news"
								element={<NewsContainer news={news} />}
								loader={() => import("./Component/NewsContainer/NewsContainer")}
							/>

							{/* props are used to send the value */}

							<Route
								path="/crypto"
								element={<CryptoTable />}
								loader={() => import("./Component/Tables/CryptoTable")} // Preload on hover or interaction
							/>

							<Route
								path="/about"
								element={
									<Suspense fallback={<div>Loading navbar</div>}>
										<About />
									</Suspense>
								}
							/>

							<Route
								path="/login"
								element={
									<Suspense fallback={<div>Loading navbar</div>}>
										<Login />
									</Suspense>
								}
							/>

							<Route
								path="/signup"
								element={
									<Suspense fallback={<div>Loading navbar</div>}>
										<Signup />
									</Suspense>
								}
							/>

							{/* the ":id" means id here is a dynmic value and when someone is */}
							{/* /redirecting to such a link StockPage gets rendered */}
							<Route path="/stock/:id" element={<StockPage />} />
							<Route path="/crypto/:id" element={<CoinPage />} />
							<Route path="/watchList" element={<WatchList />} />
						</Routes>

						<Footer />
					</WatchListProvider>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
