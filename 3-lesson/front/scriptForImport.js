const backBtn = document.querySelector("#back");
const submit = document.querySelector('#submit');
const make = document.querySelector('#make');
const model = document.querySelector('#model');
const color = document.querySelector('#color');


const addCar = (make, model, color) => {

	fetch('http://localhost:3000/cars',
	{
		method: 'POST',
		headers: {
			'Content-Type':
			'application/json'
		},
		body: JSON.stringify({
			make: `${make}`,
			model: `${model}`,
			color: `${color}`
		}) 
	})
	.then((response) => {
		if (response.ok) {
			return response.json()
		}
	})
	.then((result) => {
		console.log(result)
	})
}


backBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Click')
  window.location.href = 'index.html';
})

submit.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Click')
  addCar(make.value, model.value, color.value)

})

