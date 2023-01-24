const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  res.send("This is a post request!");
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://tanmay:notpassword@cluster0.xcgkdi7.mongodb.net/?retryWrites=true&w=majority"
    );

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
