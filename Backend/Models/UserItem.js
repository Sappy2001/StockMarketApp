const mongoose = require("mongoose");
const UserItemSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	symbol: {
		type: String,
		required: true,
	},
	data: {
		type: Object,
		required: true,
	},
	date: {
		type: String,
		default: Date.now,
	},
});
const UserItem = mongoose.model("userItem", UserItemSchema);

UserItem.createIndexes();
module.exports = UserItem;
