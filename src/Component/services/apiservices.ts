import axios from "axios";

//asios get finction that can be reused
// --"?"means its an optional parameter
const fetchData = (apiLink: string, params?: object) => {
	return axios.get(apiLink, params ? { params } : {});
};

const stockapi = "lCErM9D7CT35jOs52grWZt4AjZIpRuHr";
const getNewsData = () => {
	return fetchData(
		"https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=b721c529a2e4491891a80bd3119ad5e7"
	);
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

const getWatchListedData = (email: any) => {
	return fetchData("http://localhost:1999/userData", {
		email: email,
	});
};

const addToWatchList = (email: any, symbol: any, data: any) => {
	axios
		.post("http://localhost:1999/userData", {
			email: email,
			symbol: symbol,
			data: data,
		})
		.then((res) => {
			alert(data.type + " added to the watchlist");
		})
		.catch((err) => alert(err));
};

const deleteWatchListItem = (id: any) => {
	return axios.delete(`http://localhost:1999/userData/${id}`);
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
