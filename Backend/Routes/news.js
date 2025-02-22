const express = require("express");
const router = express.Router();

router.get("/fetchNews", async (req, res) => {
	try {
		const response = await fetch(
			`https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${process.env.newsApiKey}`
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error });
	}
});

module.exports = router;
