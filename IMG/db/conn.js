// Require Mongoose
const mongoose = require("mongoose");

// Creating a database
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/BackendIMG"); // If there is a collection named BackendTut It will use it else make it
  console.log("connection with the database is successful");
}
