import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: {
      imageId: String,
      url: String,
    },
  },
});

export const User = mongoose.model("User", UserSchema);
