const memberships = document.querySelector("#btnMemberships");
const addBtn = document.querySelector("#addBtn");
const container = document.querySelector("#container");
const asc = document.querySelector("#asc");
const ascBtn = document.querySelector("#ascBtn");

ascBtn.addEventListener("click", () => {
  if (asc.textContent == "ASC") {
    asc.textContent = "DSC";
    start("DSC");
  } else {
    asc.textContent = "ASC";
    start("asc");
  }
});

memberships.addEventListener("click", () => {
  window.location.href = "memberships.html";
});

addBtn.addEventListener("click", () => {
  window.location.href = "addUser.html";
});

const start = (x) => {
  fetch(`http://localhost:3000/users/${x}`, {
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
      container.innerHTML = "";
      draw(result);
      return result.data;
    });
};

start("asc");

const draw = (data) => {
  if (data.length < 1) {
    const noUsers = document.createElement("h1");
    noUsers.textContent = "Sory, no Users";
    container.appendChild(noUsers);
  } else {
    data.forEach((element) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const p = document.createElement("p");
      p.textContent = `${element.fname} ${element.lname}`;
      p.setAttribute("class", "name");

      const mail = document.createElement("p");
      mail.textContent = `Email Address: `;
      const mailName = document.createElement("span");
      mailName.textContent = element.mail;
      mail.appendChild(mailName);

      const plan = document.createElement("p");
      plan.textContent = `Membership: `;
      const pName = document.createElement("span");

      if (element.plans.length > 0) {
        const planName = element.plans[0];
        pName.textContent = planName.name;
      } else if (element.plans.length < 1) {
        pName.textContent = "Plan has been removed";
        pName.setAttribute("class", "error");
      }

      plan.appendChild(pName);

      card.appendChild(p);
      card.appendChild(mail);
      card.appendChild(plan);
      container.appendChild(card);
    });
  }
};
