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

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("second").collection("users").find().toArray();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const users = await con.db("second").collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      user_id: req.body.id,
    });
    const comments = await con.db("second").collection("comments").insertOne({
      comment: req.body.comment,
      date: new Date(),
      user_id: req.body.id,
    });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/comments", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("second")
      .collection("comments")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "all",
          },
        },
      ])
      .toArray();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/comments/:id", async (req, res) => {
  try {
    const id = +req.params.id;
    const con = await client.connect();
    const data1 = await con
      .db("second")
      .collection("users")
      .deleteOne({ user_id: id });
    const data2 = await con
      .db("second")
      .collection("comments")
      .deleteOne({ user_id: id });

    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/productsall", async (req, res) => {
  console.log("delete");
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con.db("shop").collection("products").deleteMany();

    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
