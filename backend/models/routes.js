import { Router } from "express";
import User from "./UserModel.js";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//* Post new User
userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let user = new User({ name, email });
  user.setPassword(password);
  user = await user.save();
  res.send({ message: "New user created", data: user });
});

//* Get User Profile
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+salt").select("+hash");
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    res.send({ message: "Succesfull", data: user });
  } else {
    res.send({
      message: "Failed",
      error: {
        message: "Password and E-Mail combination is wrong",
      },
    });
  }
});
