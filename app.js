const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("bson");

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
  let books = [];
  db.collection("books")
    .find()
    .sort({ title: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: "could not fetch the document" });
      });
  } else {
    res.status(500).json({ error: "not a valid document id" });
  }
});
