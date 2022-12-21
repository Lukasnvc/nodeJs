require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 8080;
const URI = process.env.URI;
console.log(URI);

const client = new MongoClient(URI);

app.use(cors());
app.use(express.json());

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("services")
      .find()
      .toArray();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("project").collection("services").insertOne({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/memberships/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("services")
      .deleteOne({ _id: ObjectId(`${id}`) });
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users/:order", async (req, res) => {
  const order = req.params.order;
  console.log(order);
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "services",
            localField: "plan",
            foreignField: "_id",
            as: "plans",
          },
        },
        { $sort: { fname: order === "asc" ? 1 : -1 } },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("project")
      .collection("users")
      .insertOne({
        fname: req.body.fname,
        lname: req.body.lname,
        mail: req.body.mail,
        plan: ObjectId(req.body.plan),
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
