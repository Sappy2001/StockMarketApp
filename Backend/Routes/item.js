const express = require("express");
const router = express.Router();
const UserItem = require("../Models/UserItem");
const { body, validationResult } = require("express-validator");

//getting all items
router.get("/fetchUserItems", async (req, res) => {
	try {
		console.log(req.query.email);
		const userItems = await UserItem.find({ email: req.query.email });
		console.log({ userItems });
		res.send({ userItems });
	} catch (err) {
		console.log(err.message);
		res.status(401).send("enter proper credentials");
	}
});

//saving items for that user
router.post(
	"/saveItem",
	[body("email").isLength({ min: 5 }), body("symbol").notEmpty()],
	async (req, res) => {
		const err = validationResult(req);
		if (!err.isEmpty()) {
			return res.status(400).send(err.array());
		}
		const { email, symbol, data } = req.body;
		try {
			const userItem = new UserItem({
				email,
				symbol,
				data,
			});
			const savedItem = await userItem.save();
			res.send({ savedItem, success: true });
		} catch (error) {
			console.log(error.message);
			res.status(500).send({ msg: "Internal Server Error", success: false });
		}
	}
);

//deleting item
router.delete("/deleteItem/:id", async (req, res) => {
	const itemId = req.params.id;
	try {
		let userItem = await UserItem.findById(itemId);
		if (!userItem) {
			return res.status(404).send("Item not found");
		}
		if (userItem.email.toString() !== req.email) {
			return res.status(401).send("not allowed");
		}
		userItem = await UserItem.findByIdAndDelete(itemId);
		res.send({ Success: "Item has been deleted" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ error });
	}
});

module.exports = { router };
