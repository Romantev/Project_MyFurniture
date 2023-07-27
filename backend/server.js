import "./config/config.js"; //als 1. importieren!!!
import express from "express";
import "./models/index.js"; // = running index.js
import multer from "multer";

//* Models importieren
import { BigStuff } from "./models/BigStuffModel.js";
import { NotSoBigStuff } from "./models/NotSoBigStuffModel.js";
import { SmallStuff } from "./models/SmallStuff.js";
import { User } from "./models/UserModel.js";

//* CLOUDINARY Config
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

//! ------------ GET ROUTES ------------------------
//- BigStuff "fetchen"
app.get("/api/bigstuff", async (req, res) => {
  const { titleSearch, searchRoom, sortBy } = req.query;

  if (titleSearch || searchRoom) {
    let responseData = await BigStuff.find();
    // Check for Title
    if (titleSearch) {
      responseData = responseData.filter((data) => {
        return data.title.toLowerCase().includes(titleSearch.toLowerCase());
      });
      //sort
      if (sortBy) {
        responseData.sort((dataA, dataB) => {
          return dataA.sortBy.localeCompare(dataB.sortBy);
        });
      }
      // Check for Room
    } else {
      responseData = responseData.filter((data) => {
        return data.room.toLowerCase().includes(searchRoom.toLowerCase());
      });
      //sort
      if (sortBy) {
        responseData.sort((dataA, dataB) => {
          return dataA.sortBy.localeCompare(dataB.sortBy);
        });
      }
    }
    res.json(responseData);
  } else {
    try {
      const allBigStuff = await BigStuff.find();
      res.send(allBigStuff);
    } catch (err) {
      console.error(err);
      res.send("There was an error fetching the Big Stuff");
    }
  }
});

//- NotSoBigStuff "fetchen"
app.get("/api/notsobigstuff", async (req, res) => {
  try {
    const allBigStuff = await NotSoBigStuff.find();
    res.send(allBigStuff);
  } catch (err) {
    console.error(err);
    res.send("There was an error fetching the Big Stuff");
  }
});
//- SmallStuff "fetchen"
app.get("/api/smallstuff", async (req, res) => {
  try {
    const allBigStuff = await SmallStuff.find();
    res.send(allBigStuff);
  } catch (err) {
    console.error(err);
    res.send("There was an error fetching the Big Stuff");
  }
});

//- BigStuff by Id
app.get("/api/bigstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await BigStuff.findOne({ _id: id });
    console.log("HERE:", item);
    res.json(item);
  } catch (err) {
    console.error(err);
  }
});

//- NotSoBigStuff by Id
app.get("/api/notsobigstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await NotSoBigStuff.findOne({ _id: id });
    res.json(item);
  } catch (err) {
    console.error(err);
  }
});

//- SmallStuff by Id
app.get("/api/smallstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SmallStuff.findOne({ _id: id });
    res.json(item);
  } catch (err) {
    console.error(err);
  }
});

//- BigStuff by Id
app.get("/api/bigstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await BigStuff.find({ _id: id });
    console.log(item);
    res.send(item);
  } catch (err) {
    console.error(err);
  }
});

//- NotSoBigStuff by Id
app.get("/api/notsobigstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await NotSoBigStuff.find({ _id: id });
    console.log(item);
    res.send(item);
  } catch (err) {
    console.error(err);
  }
});

//- SmallStuff by Id
app.get("/api/smallstuff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await SmallStuff.find({ _id: id });
    console.log(item);
    res.send(item);
  } catch (err) {
    console.error(err);
  }
});

//! ------------ POST ROUTES ------------------------
//- BigStuff hinzufuegen
app.post("/api/bigstuff", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "FurnitureBig",
        },
        async (err, result) => {
          const response = await BigStuff.create({
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

//- NotSoBigStuff hinzufuegen
app.post("/api/notsobigstuff", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "FurnitureNotSoBig",
        },
        async (err, result) => {
          const response = await NotSoBigStuff.create({
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
//- SmallStuff hinzufuegen
app.post("/api/smallstuff", upload.single("image"), async (req, res) => {
  console.log(req.file);
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "FurnitureSmall",
        },
        async (err, result) => {
          const response = await SmallStuff.create({
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

//! ------------ PUT ROUTES ------------------------
//- BigStuff editieren
app.put("/api/bigstuff/:id", async (req, res) => {
  const { id } = req.params;
  const editedStuff = req.body;

  try {
    const dbRes = await BigStuff.findByIdAndUpdate(id, editedStuff, {
      new: true,
    }); //* Wenn man ein Dokument in MongoDB mit findByIdAndUpdate aktualisierst, wird standardmäßig das Dokument vor der Aktualisierung (das Originaldokument) zurückgegeben. Indem dmannew: true als Option angibt, weist man MongoDB jedoch an, das aktualisierte Dokument zurückzugeben.
    res.send(dbRes);
  } catch (err) {
    console.error(err);
  }
});

//- NotSoBigStuff editieren
app.put("/api/notsobigstuff/:id", async (req, res) => {
  const { id } = req.params;
  const editedStuff = req.body;

  try {
    const dbRes = await NotSoBigStuff.findByIdAndUpdate(id, editedStuff, {
      new: true,
    });
    res.send(dbRes);
  } catch (err) {
    console.error(err);
  }
});

//- SmallStuff editieren
app.put("/api/smallstuff/:id", async (req, res) => {
  const { id } = req.params;
  const editedStuff = req.body;

  try {
    const dbRes = await SmallStuff.findByIdAndUpdate(id, editedStuff, {
      new: true,
    });
    res.send(dbRes);
  } catch (err) {
    console.error(err);
  }
});

//! ------------ DELETE ROUTES ------------------------
//- BigStuff loeschen
app.delete("/api/bigstuff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await BigStuff.findByIdAndDelete(id);
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    ); //bild aus der datenbank loeschen
    res.send("post has been deleted");
  } catch (err) {
    console.error(err);
  }
});

//- NotSoBigStuff loeschen
app.delete("/api/notsobigstuff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await NotSoBigStuff.findByIdAndDelete(id);
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    );
    res.send("post has been deleted");
  } catch (err) {
    console.error(err);
  }
});

//- SmallStuff loeschen
app.delete("/api/smallstuff/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await SmallStuff.findByIdAndDelete(id);
    cloudinary.uploader.destroy(dbRes.image?.imageId, (err) =>
      console.log(err)
    );
    res.send("post has been deleted");
  } catch (err) {
    console.error(err);
  }
});

//* User anzeigen
app.get("/api/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log("Get User: ", error);
  }
});

//* User anlegen
app.post("/api/user", upload.single("image"), async (req, res) => {
  try {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: "MyFurnitureUser",
        },
        async (err, result) => {
          const response = await User.create({
            ...req.body,
            image: {
              url: result.secure_url,
              imageId: result.public_id,
            },
          });
          res.json(response);
          console.log("success");
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    console.log("POST USER: ", error);
  }
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
