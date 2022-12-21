const memberships = document.querySelector("#btnMemberships");
const cancel = document.querySelector("#cancel");
const add = document.querySelector("#addBtn");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const mail = document.querySelector("#email");
const plan = document.querySelector("#plan");

memberships.addEventListener("click", () => {
  window.location.href = "memberships.html";
});

const relocate = () => {
  window.location.href = "users.html";
};
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  relocate();
});

const userAdd = (fname, lname, mail, plan) => {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname: `${fname}`,
      lname: `${lname}`,
      mail: `${mail}`,
      plan: `${plan}`,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((result) => {
      relocate();
    });
};

add.addEventListener("click", (e) => {
  e.preventDefault();
  userAdd(fname.value, lname.value, mail.value, plan.value);
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
  data.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${element._id}`);
    option.textContent = element.name;
    plan.appendChild(option);
  });
};
