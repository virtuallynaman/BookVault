const express = require("express");
const { connectToDb, getDb } = require("./db");

//init app and middleware
const app = express();

//db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("Server started at port 3000");
    });
  }
  db = getDb();
});

//routes
app.get("/books", (req, res) => {
  res.send("Welcome to BookVault")
});
