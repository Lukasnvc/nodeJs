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

app.use(cors());
app.use(express.json());

app.get("/articles", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("second").collection("articles").find().toArray();
    console.log(data);
    res.render("main.ejs", { data: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/articles", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("second").collection("articles").insertOne({
      timestamp: new Date().toLocaleString(),
      imageUrl: req.body.imageUrl,
      title: req.body.title,
      description: req.body.description,
    });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
