const express = require("express");
const fs = require("fs");

const app = express();

app.get("/collections", (req, res) => {
  const collections = JSON.parse(
    fs.readFileSync("./data//collections.json")
  ).collections;
  res.send(collections);
});

app.get("/collections/:collectionid", (req, res) => {
  const articles = JSON.parse(fs.readFileSync("./data/articles.json"));

  const collectionid = req.params.collectionid;
  const storedArticles = articles[collectionid];
  if (storedArticles) {
    res.send(storedArticles);
  } else {
    res.status(404).send(`Article not found for collectionid: ${collectionid}`);
  }
});

// endpoint to serve frontend
app.use("/", express.static("client"));

// not found endpoint
app.use((req, res) => {
  res.status(404).send(`Endpoint path does not exist: ${req.path}`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
