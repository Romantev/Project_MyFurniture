import "./config/config.js";
import "./models/index.js";
import express from "express";
import multer from "multer";

import { Stuff } from "./models/StuffModel.js";
import { userRouter } from "./models/routes.js";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dsxn8rwnn",
  api_key: "939136449556866",
  api_secret: "ujw14LfvXll6o-dJSOezF0HoCmo",
});

const app = express();
const PORT = 3001;

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

//! ------------ ROUTES FOR USER------------
app.use("/api/user", userRouter);

//! ------------ GET STUFF (WITH QUERY PARAMETERS)------------
app.get("/api/stuff", async (req, res) => {
  const { searchTitle, searchRoom, sortBy, searchCategory } = req.query;

  if (searchTitle || searchRoom || searchCategory) {
    let responseData = await Stuff.find();
    //* Check for Title
    if (searchTitle) {
      responseData = responseData.filter((data) => {
        return data.title.toLowerCase().includes(searchTitle.toLowerCase());
      });
      if (sortBy) {
        responseData.sort((dataA, dataB) => {
          return dataA.sortBy.localeCompare(dataB.sortBy);
        });
      }
      //* Check for Room
    } else if (searchRoom) {
      responseData = responseData.filter((data) => {
        return data.room.toLowerCase().includes(searchRoom.toLowerCase());
      });
      if (sortBy) {
        responseData.sort((dataA, dataB) => {
          return dataA.sortBy.localeCompare(dataB.sortBy);
        });
      }
      //* Check for Category
    } else if (searchCategory) {
      responseData = responseData.filter((data) => {
        return data.title.toLowerCase().includes(searchCategory.toLowerCase());
      });
      if (sortBy) {
        responseData.sort((dataA, dataB) => {
          return dataA.sortBy.localeCompare(dataB.sortBy);
        });
      }
    }
    res.json(responseData);
  }
  //* If none match, get all
  else {
    try {
      const allStuff = await Stuff.find();
      res.send(allStuff);
    } catch (err) {
      console.error(err);
      res.send("There was an error fetching the Stuff");
    }
  }
});

//! ------------ GET STUFF by ID ------------
app.get("/api/stuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Stuff.findOne({ _id: id });
    console.log("HERE:", item);
    res.json(item);
  } catch (err) {
    console.error(err);
  }
});

//! ------------ POST STUFF ------------
app.post("/api/stuff", upload.single("image"), async (req, res) => {
  //* upload Image to Cloudinar
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "FurnitureBig",
        },
        async (err, result) => {
          //* create new Stuff
          const response = await Stuff.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
          res.send(response);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.error(err);
  }
});

//! ------------ PUT STUFF ------------
app.put("/api/stuff/:id", async (req, res) => {
  const { id } = req.params;
  const editedStuff = req.body;

  try {
    const dbRes = await Stuff.findByIdAndUpdate(id, editedStuff, {
      new: true,
    });
    res.send(dbRes);
  } catch (err) {
    console.error(err);
  }
});

//! ------------ DELETE STUFF ------------
app.delete("/api/stuff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await Stuff.findByIdAndDelete(id);
    //* Image deleted from Cloudinary
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    );
    res.send("post has been deleted");
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
