const btnPets = document.querySelector("#btnPets");
const submit = document.querySelector("#submit");
const petName = document.querySelector("#name");
const type = document.querySelector("#type");
const age = document.querySelector("#age");
const form = document.querySelector("form");

const post = (name, type, age) => {
  fetch("http://localhost:3000/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${name}`,
      type: `${type}`,
      age: +age,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      console.log(result);
      relocate();
    });
};

const relocate = () => {
  window.location.href = "index.html";
};
btnPets.addEventListener("click", () => {
  relocate();
});

submit.addEventListener("click", (event) => {
  event.preventDefault();
  post(petName.value, type.value, age.value);
});
