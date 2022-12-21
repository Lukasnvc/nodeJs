const container = document.querySelector("#container");
const addBtn = document.querySelector("#addBtn");
const btnUsers = document.querySelector("#btnUsers");

btnUsers.addEventListener("click", () => {
  window.location.href = "users.html";
});

addBtn.addEventListener("click", () => {
  window.location.href = "addMembership.html";
});

const start = () => {
  fetch("http://localhost:3000/memberships", {
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
      draw(result);
      return result.data;
    });
};

start();

const draw = (data) => {
  console.log(data);
  data.forEach((item) => {
    const div = document.createElement("div");
    div.setAttribute("class", "card");

    const price = document.createElement("span");
    price.textContent = `$${item.price} ${item.name}`;

    const description = document.createElement("p");
    description.textContent = item.description;

    const deleteBtn = document.createElement("i");
    deleteBtn.setAttribute("class", "fa-solid fa-trash-can");

    deleteBtn.addEventListener("click", () => {
      deleteOne(item._id);
    });

    div.appendChild(price);
    div.appendChild(description);
    div.appendChild(deleteBtn);
    container.appendChild(div);
  });
};

const deleteOne = (id) => {
  fetch(`http://localhost:3000/memberships/${id}`, {
    method: "DELETE",
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
      container.innerHTML = "";
      start();
      return result.data;
    });
};
