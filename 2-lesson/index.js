const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const names = ["Tomas", "Jonas", "Tadas", "Linas", "Ignas"];

app.get('/users', (req, res) => {
  res.send(names)
});

app.get(`/users/:id`, (req, res) => {
  const id = req.params.id.toLocaleUpperCase();
  let nameArray = [];
  names.forEach(name => {
    if (name.startsWith(id)) {
      nameArray.push(name);
    }
  })
  res.send(nameArray);
})

app.post('/users', (req, res) => {
  const newName = req.body.name;
  names.push(newName);
  console.log(req.body);
  res.send(names);
})

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`)
})



