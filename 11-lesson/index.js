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

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const uniqueData = await response.json();
    console.log(uniqueData.results);

    const con = await client.connect();
    const data = await con.db("second").collection("fetch").insertOne({
      title: uniqueData.results[0].name.title,
      name: uniqueData.results[0].name.first,
      lname: uniqueData.results[0].name.last,
      mail: uniqueData.results[0].email,
      pic: uniqueData.results[0].picture.thumbnail,
    });
    const show = await con.db("second").collection("fetch").find().toArray();
    await con.close();
    res.render("main.ejs", { data: show });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
