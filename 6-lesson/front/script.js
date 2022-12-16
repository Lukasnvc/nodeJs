const addBtn = document.querySelector("#addBtn");
const btnDog = document.querySelector("#btnDog");
const btnCat = document.querySelector("#btnCat");
const btnBunny = document.querySelector("#btnBunny");
const table = document.querySelector("#table");
const asc = document.querySelector("#asc");

btnDog.addEventListener("click", (e) => {
  e.preventDefault();
  if (btnDog.style.backgroundColor === "purple") {
    btnDog.style.backgroundColor = "";
    ascPost("/");
  } else {
    btnDog.style.backgroundColor = "purple";
    if (
      btnCat.style.backgroundColor === "purple" ||
      btnBunny.style.backgroundColor === "purple"
    ) {
      btnCat.style.backgroundColor = "";
      btnBunny.style.backgroundColor = "";
    }
    ascPost("?type=dog");
  }
});

btnCat.addEventListener("click", (e) => {
  e.preventDefault();
  if (btnCat.style.backgroundColor === "purple") {
    btnCat.style.backgroundColor = "";
    ascPost("/");
  } else {
    btnCat.style.backgroundColor = "purple";
    if (
      btnDog.style.backgroundColor === "purple" ||
      btnBunny.style.backgroundColor === "purple"
    ) {
      btnDog.style.backgroundColor = "";
      btnBunny.style.backgroundColor = "";
    }
    ascPost("?type=cat");
  }
});

btnBunny.addEventListener("click", (e) => {
  e.preventDefault();
  if (btnBunny.style.backgroundColor === "purple") {
    btnBunny.style.backgroundColor = "";
    ascPost("/");
  } else {
    btnBunny.style.backgroundColor = "purple";
    if (
      btnCat.style.backgroundColor === "purple" ||
      btnDog.style.backgroundColor === "purple"
    ) {
      btnCat.style.backgroundColor = "";
      btnDog.style.backgroundColor = "";
    }
    ascPost("?type=bunny");
  }
});

addBtn.addEventListener("click", () => {
  window.location.href = "add.html";
});

fetch("http://localhost:3000/pets", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((result) => {
    console.log(result);
    draw(result);
    return result.data;
  });

const draw = (data) => {
  console.log(data);
  data.forEach((element) => {
    const tr = document.createElement("tr");

    const name = document.createElement("td");
    name.textContent = element.name;

    const type = document.createElement("td");
    type.textContent = element.type;

    const age = document.createElement("td");
    age.textContent = element.age;

    tr.appendChild(name);
    tr.appendChild(type);
    tr.appendChild(age);
    table.appendChild(tr);
  });
};

const ascPost = (x) => {
  fetch(`http://localhost:3000/byoldest${x}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      console.log(result);
      table.innerHTML = "";
      draw(result);
      return result.data;
    });
};

asc.addEventListener("click", (e) => {
  e.preventDefault();
  if (asc.textContent === "Asc") {
    ascPost("?sort=asc");
    asc.textContent = "Dsc";
  } else {
    ascPost("?sort=dsc");
    asc.textContent = "Asc";
  }
});
