import mongoose from "mongoose";

const stuffSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Bigstuff", "NotSoBigstuff", "Smallstuff"],
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

export const Stuff = mongoose.model("Stuff", stuffSchema);
