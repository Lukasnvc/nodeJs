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

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("first").collection("pets").find().toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("first").collection("pets").insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/pets/:type", async (req, res) => {
  const type = req.params.type;
  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("pets")
      .find({ type: `${type}` })
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/byoldest", async (req, res) => {
  const { sort, type } = req.query;

  console.log(req.query);
  console.log(sort, type);

  try {
    const con = await client.connect();
    const data = await con
      .db("first")
      .collection("pets")
      .find(type ? { type } : {})
      .sort({ age: sort === "asc" ? 1 : -1 })
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// pagal query filtruoja po klaustuko
// app.get("/", async (req, res) => {
//   const { brand } = req.query;

//   try {
//     const con = await client.connect();

//     const data = await con

//       .db("first")

//       .collection("cars")

//       .find(brand ? { brand } : {})

//       .toArray();

//     await con.close();

//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
