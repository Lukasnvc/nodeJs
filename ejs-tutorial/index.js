require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const URI = process.env.URI;
console.log(URI);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
  res.render("data.ejs");
});

app.post("/home", (req, res) => {
  console.log("we are in post Home");
  console.log(req.body);
  username = req.body.username;
  password = req.body.password;

  console.log(username + "" + password);

  res.render("data.ejs", { user: username });
});

ar = ["John", "Mary", "Bob"];

app.get("/array", (req, res) => {
  res.render("array.ejs", { array: ar });
});

app.post("/array", (req, res) => {
  let name = req.body.name;
  ar.push(name);
  res.redirect("/array");
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
