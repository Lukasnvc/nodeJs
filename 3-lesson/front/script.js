const table = document.querySelector("#table");
const putBtn = document.querySelector("#putBtn");

putBtn.addEventListener('click', () => {
  window.location.href = 'imports.html';
})

    fetch('http://localhost:3000/cars',
  {
    method: 'GET',
    headers: {
      'Content-Type':
      'application/json'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((result) => {
    console.log(result)
     draw(result);
    return result.data
  })
  



  const draw = (data) => {
    console.log(data)
    data.forEach(element => {
      const tr = document.createElement('tr');
      
      const id = document.createElement('td');
      id.textContent = element.id;

      const make = document.createElement('td');
      make.textContent = element.make;

      const model = document.createElement('td');
      model.textContent = element.model;

      const color = document.createElement('td');
      color.textContent = element.color;

      tr.appendChild(id);
      tr.appendChild(make);
      tr.appendChild(model);
      tr.appendChild(color);
      table.appendChild(tr);
    });
  }