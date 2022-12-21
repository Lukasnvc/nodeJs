const cancel = document.querySelector("#cancel");
const add = document.querySelector("#addBtn");
const nameM = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const users = document.querySelector("#btnUsers");

users.addEventListener("click", () => {
  window.location.href = "users.html";
});

const relocate = () => {
  window.location.href = "memberships.html";
};
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("cancel");
  relocate();
});

const addMembership = (name, price, description) => {
  fetch("http://localhost:3000/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${name}`,
      price: `${price}`,
      description: `${description}`,
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

add.addEventListener("click", () => {
  addMembership(nameM.value, price.value, description.value);
});
