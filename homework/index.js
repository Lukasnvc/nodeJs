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
    const con = await client.connect();
    const data = await con.db("first").collection("users").find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("users")
      .find({
        id: `${id}`,
      })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/title/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("users")
      .find({
        title: `${id}`,
      })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req);
    const con = await client.connect();
    const data = await con.db("first").collection("users").insertOne({
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("users")
      .updateOne({ id: `${id}` }, { $set: { body: req.body.body } });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("users")
      .deleteOne({
        id: `${id}`,
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
