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
  // console.log(await mongoose.connection.db.listCollections().toArray()); listing all collections in the DB
  try {
    const result = await Customer.find();
    res.send({ customers: result });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.get("/api/customers/:id", async (req, res) => {
  // res.send({
  //   reqParameters: req.params, //url params - htt..com/param1/param2
  //   reqQueryParams: req.query, //url query params - htt...com?param1="val"&param2="val"
  // });
  try {
    // const result = await Customer.find({ _id: req.params.id });
    const result = await Customer.findById(req.params.id);
    if (!result) res.status(404).json({ error: "Not found." });
    else res.json({ customer: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
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
