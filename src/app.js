const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");

mongoose.set("strictQuery", false);
dotenv.config();

const app = express();
app.use(express.json()); // this is to parse request bodies for post (body-parser)
const PORT = process.env.PORT || 3000;
const CONN = process.env.CONN;

app.get("/", (req, res) => {
  res.send("Welcome to Noob House");
});

app.get("/api/customers", async (req, res) => {
  console.log(await mongoose.connection.db.listCollections().toArray());
  try {
    const result = await Customer.find();
    res.send({ customers: result });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.post("/api/customers", (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    customer.save();
    res.status(201).send({ customer });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const start = async () => {
  try {
    await mongoose.connect(CONN);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
