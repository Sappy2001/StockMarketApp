import axios from "axios";

//axios get function that can be reused
// --"?"means its an optional parameter
const fetchData = (apiLink: string, params?: object) => {
	return axios.get(apiLink, params ? { params } : {});
};

const stockapi = process.env.REACT_APP_stockapiKey;
const backend = process.env.REACT_APP_BackendURL;

const getNewsData = () => {
	return fetchData(`${backend}/news/fetchNews`);
};

const getStockNews = () => {
	return fetchData(
		`https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=${stockapi}`
	);
};

const getStockdata = () => {
	return fetchData(
		`https://financialmodelingprep.com/api/v3/stock/list?apikey=${stockapi}`
	);
};

const getCompanyInfo = (symbol: any) => {
	return fetchData(
		`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${stockapi}`
	);
};

// Coins api run 30 calls per min
const CoinList = (currency: string) => {
	return fetchData(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1`
	);
};
const SingleCoin = (id: any) => {
	return fetchData(`https://api.coingecko.com/api/v3/coins/${id}`);
};
const HistoricalCoinChart = (id: string, days: string, currency: string) => {
	return fetchData(
		`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
	);
};

const TrendingCoins = (currency: string) => {
	return fetchData(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1`
	);
};

const historicalStockData = (time: string, symbol: string) => {
	return fetchData(
		`https://financialmodelingprep.com/api/v3/historical-chart/${time}/${symbol}?&apikey=${stockapi}`
	);
};

const getWatchListedData = async (email: any) => {
	const data = await fetchData(`${backend}/items/fetchUserItems`, {
		email,
	});
	return data;
};

const addToWatchList = async (email: any, symbol: any, data: any) => {
	return axios
		.post(`${backend}/items/saveItem`, {
			email: email,
			symbol: symbol,
			data: data,
		})
		.then((res) => {
			alert(data.type + " added to the watchlist");
			getWatchListedData(email);
			return res.data.success;
		})
		.catch((err) => {
			console.log(err.response.data.message);
			alert(
				err.response.data.message.includes("E11000")
					? "Cannot add same item"
					: "Internal server error"
			);
			return err.response.data.success;
		});
};

const deleteWatchListItem = (id: any, email: any) => {
	return axios
		.delete(`${backend}/items/deleteItem/${id}`, { data: { email } })
		.then((res) => {
			alert("Item Deleted");
			console.log(res);
		})
		.catch((err) => {
			alert("Internal Server Error");
			console.log(err);
		});
};

export {
	getStockNews,
	getNewsData,
	getStockdata,
	SingleCoin,
	CoinList,
	HistoricalCoinChart,
	TrendingCoins,
	getCompanyInfo,
	historicalStockData,
	addToWatchList,
	getWatchListedData,
	deleteWatchListItem,
};
