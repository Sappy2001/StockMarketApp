const ConnecToMongo = require("./db");
const express = require("express");
ConnecToMongo();
const cors = require("cors");
const app = express();
const port = 5000;
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
