import mongoose from "mongoose";

const smallStuffSchema = new mongoose.Schema({
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

export const SmallStuff = mongoose.model("SmallStuff", smallStuffSchema);
