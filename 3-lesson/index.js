// npm init - sukuria package.json faila
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const cars = [{
  id: 1,
  make: 'BMW',
  model: '530',
  color: 'black',
},
{
  id: 2,
  make: 'Audi',
  model: 'A6',
  color: 'white',
}];

app.get('/cars', (req, res) => {
  res.send(cars);
});

app.get('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find(car => car.id === id);
  if (car) {
    res.send(car);
  } else {
    return res.status(404).send('Not found');
  }
});

app.post('/cars', (req, res) => {
  const car = req.body;
  if (car.make && car.model && car.color) {
    console.log(car);
    const newCar = { ...car, id: Date.now() };
    cars.push(newCar);
    res.send(cars);
  } else {
    return res.status(404).send('Invalid request');
  }
});

app.put('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const update = req.body;

  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send('Car doesnt exist');

  const updatedCar = { ...car, ...update };
  const index = cars.indexOf(car);
  cars.splice(index, 1, updatedCar);

  res.send({
    message: `Updated car: ${updatedCar}`,
  });
});

app.delete('/cars/:id', (req, res) => {
  const id = +req.params.id;
  const car = cars.find((car) => car.id === id);

  if (!car) return res.status(404).send('Car doesnt exist');

  const index = cars.indexOf(car);
  cars.splice(index, 1);

  res.send({
    message: cars,
  });
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
