const mongoose = require("mongoose");
//since password has special character it needs to be ecoded
const encodedPassword = encodeURIComponent("Sappy2001");
mongoURI = `mongodb+srv://saptangsumodak:${encodedPassword}@stockmarketcluster.4mjpj.mongodb.net/UserDB?retryWrites=true&w=majority&appName=StockMarketCluster`;
const ConnecToMongo = async () => {
	try {
		await mongoose.connect(mongoURI);
		console.log("MongoDb Connected");
	} catch (error) {
		console.log("Error", error);
	}
};

module.exports = ConnecToMongo;
