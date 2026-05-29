const usernameInput = document.querySelector("input[type=text]");
const passwordInput = document.querySelector("input[type=password]");
const form = document.querySelector("form");

const userdb = [
  { id: 1, username: "ali", password: "12345678" },
  { id: 2, username: "amir", password: "amiramir" },
  { id: 3, username: "ehsan", password: "ehsan123" },
];

const validateUser = (user) => {
  const found = userdb.find((item) => {
    return item.username == user.username && item.password == user.password;
  });
  if (found) {
    return found.id;
  } else {
    return -1;
  }
};

const getLoginInfo = () => {
  if (localStorage.getItem("login")) {
    return JSON.parse(localStorage.getItem("login"));
  } else {
    return -1;
  }
};

let user = {
  username: "",
  password: "",
};

let login = getLoginInfo();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  login = validateUser(user);

  if (login != -1) {
    console.log(login);
    localStorage.setItem("login", JSON.stringify(login));
    location.assign("index.html");
  } else {
    alert("wrong info!");
  }
});

usernameInput.addEventListener("input", (e) => {
  user.username = e.target.value;
  console.log(user);
});

passwordInput.addEventListener("input", (e) => {
  user.password = e.target.value;
  console.log(user);
});
