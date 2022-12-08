// npm init - sukuria package.json faila
require('dotenv').config();

const db = require('./db');


const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.get('/users', (req, res) => {
  res.send(db.data)
})

const capitalized = (word) => {
 return word.charAt(0).toUpperCase()
  + word.slice(1)
}

app.get('/users/:car', (req, res) => {
  const car = req.params.car;
  const found = db.data.filter(user => user.car===capitalized(car))
   if (found) {
    res.send(found);
  } else {
    return res.status(404).send('Not found');
  }
})

app.get('/users/id/:id', (req, res) => {
  const id = +req.params.id;
  const found = db.data.filter(user => user.id===id)
   if (found) {
    res.send(found);
  } else {
    return res.status(404).send('Not found');
  }
})


app.get('/users/mail/all', (req, res) => {
const mailArray = [];
db.data.forEach(user => {
  mailArray.push(user.email)
})
res.send(mailArray)
})



app.get('/users/women/all', (req, res) => {
  const women = db.data.filter(user => user.gender==='Female');
  const womenNames = [];
  women.forEach(person => {
    const names = person.first_name+' '+person.last_name;
    womenNames.push(names)
  })
  res.send(womenNames)
})


app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
