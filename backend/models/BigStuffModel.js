import mongoose from "mongoose";

const bigStuffSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
	image: {
		type: {
			url: String,
			imageId: String,
		},
	},
	content: {
		type: String,
		required: true,
	},
});

export const BigStuff = mongoose.model("BigStuff", bigStuffSchema);
