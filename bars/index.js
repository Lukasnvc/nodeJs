require("dotenv").config;

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const URI = process.env.URI;

console.log(URI);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const client = new MongoClient(URI);

app.get("/bars", async (req, res) => {
  try {
    const con = await client.connect();
    const show = await con.db("second").collection("bars").find().toArray();
    await con.close();
    res.render("main.ejs", { data: show });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
