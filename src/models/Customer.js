const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: String,
});

module.exports = mongoose.model("Customers", customerSchema);
// if we need to change the database in which our collection is getting stored,
// we need to name it in the connection string in env between slash and ? after mongodb.net
// BY DEFAULT it goes into test if nothing is given there
