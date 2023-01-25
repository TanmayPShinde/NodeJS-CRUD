const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");

mongoose.set("strictQuery", false);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CONN = process.env.CONN;

const customer = new Customer({
  name: "Tanmay",
  industry: "IT",
});

customer.save();

app.get("/", (req, res) => {
  res.send(customer);
});

app.post("/", (req, res) => {
  res.send("This is a post request!");
});

const start = async () => {
  try {
    await mongoose.connect(CONN);

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
