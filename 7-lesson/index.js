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

app.get("/categories", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("shop")
      .collection("categories")
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "title",
            foreignField: "category",
            as: "products",
          },
        },
        {
          $project: {
            category: "$title",
            total: {
              $sum: "$products.price",
            },
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

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
