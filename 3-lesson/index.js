// npm init - sukuria package.json faila
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); //is JSON i JS

const cars = [{
  id: 1,
  make: "BMW",
  model: "530",
  color: "black"
},
{
  id: 2,
  make: "Audi",
  model: "A6",
  color: "white"
}]

app.get("/cars", (req, res) => {
  res.send(cars);
});

app.get("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const car = cars.find(car => car.id === id);
  if (car) {
    res.send(car)
  } else {
    res.status(404).send({
      error: "Not found"})
  }
});

app.post("/cars", (req, res) => {
  const car = req.body;
  if(car.make && car.model && car.color){
    console.log(car);
    const newCar = {...car, id: Date.now()};
    cars.push(newCar);
    res.send(cars);
  } else {
    res.status(404).send({
      error: "Invalid request"
    });
  }
});

app.put("/cars/:id", (req, res) => {
  const id = +req.params.id;
  const update = req.body;

  const car = cars.find((car) => car.id === id)

  if(!car)
  res.status(404).send({error: "Car doesnt exist"});

  const updatedCar = {...car, ...update};
  const index = cars.indexOf(car);
  cars.splice(index, 1, updatedCar);

  res.send({
    message: `Updated car: ${updatedCar}`
  })
})



app.listen(port, () => {
  console.log(`Server is running on : ${port}`)
})