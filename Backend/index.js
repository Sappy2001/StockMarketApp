const path = require("path");
//(__dirname, "../.env") goes outside two levels to search .env
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const ConnecToMongo = require("./db");
const express = require("express");
ConnecToMongo();
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const { router } = require("./Routes/item");
//applying express.json to all routes to access req.body
app.use(express.json());
app.use(cors());
//testing port
app.get("/", (req, res) => {
	res.send("Hello Connected");
});
app.use("/items", router);

app.listen(port, () => {
	console.log("listening to Finup Backend:", port);
});
