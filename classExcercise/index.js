require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 8080;
const URI = process.env.URI;
console.log(URI);

const client = new MongoClient(URI);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const con = await client.connect(); // prisijungimas prie duomenu bazes

    const data = await con.db("first").collection("people").find().toArray(); // duomenu istraukimas

    await con.close(); // prisijungimo isjungimas

    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req);
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("people")
      .insertOne({
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
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
