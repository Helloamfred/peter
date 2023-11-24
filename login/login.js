const wrapper = document.querySelector(".wrapper"),
  signupHeader = document.querySelector(".signup header"),
  loginHeader = document.querySelector(".loginin header");

const registration_form = document.querySelector(".sign_up");
const full_nameInput = document.querySelector("#full_name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
let full_name;
let email;
let password;

const login_form = document.querySelector(".sign_in");
const emaillogin = document.querySelector("#login_email");
const passwordlogin = document.querySelector("#login_password");
let loginemail;
let loginpassword;

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
full_nameInput.addEventListener("input", (e) => {
  full_name = e.target.value;
  console.log(full_name);
});

emailInput.addEventListener("input", (e) => {
  email = e.target.value;
  console.log(email);
});

passwordInput.addEventListener("input", (e) => {
  password = e.target.value;
  console.log(password);
});

// ---------------------SIGN UP--------------------------//
registration_form.addEventListener("submit", (e) => {
  e.preventDefault();
  signup();
  alert(1);
});

function signup() {
  if (full_name && email && password) {
    fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: full_name,
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        let data = await response.json();

        if (response.status === 201) {
          document;

          login_success.textContent = data.message;

          setTimeout(() => {
            login_success.textContent = "";
            // myFunction();
          }, 3000);
        } else {
          if (response.status === 500) {
            create_error.textContent = data.message;

            setTimeout(() => {
              create_error.textContent = "";
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        create_error.textContent = error.message;

        setTimeout(() => {
          create_error.textContent = "";
        }, 4000);
      });
  }

  sessionStorage.setItem("user", "data");

  // prevents displaying the values on reload
  full_nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// ---------------------------------SIGN IN--------------------------------//
login.addEventListener("submit", (e) => {
  e.preventDefault();
  checkform();
});
// -------------------Event listerners---------------
emaillogin.addEventListener("input", (e) => {
  loginemail = e.target.value;
  console.log(loginemail);
});

passwordlogin.addEventListener("input", (e) => {
  loginpassword = e.target.value;
  console.log(loginpassword);
});

function checkform() {
  if (loginemail && loginpassword) {
    console.log(loginemail, loginpassword);
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginemail,
        password: loginpassword,
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
          document;
          login_success.textContent = data.message;

          sessionStorage.setItem("loggedEmail", data.data);

          setTimeout(() => {
            login_success.textContent = "";
            if (data.data.includes("admin")) {
              // redirect to admin dashboard
              window.location.href = "/Dashboard/index.html";
            } else {
              // redirect to user page
              window.location.href = "http://127.0.0.1:5501/index.html";
            }
          }, 4000);
        } else {
          login_error.textContent = data.message;
          setTimeout(() => {
            login_error.textContent = "";
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        login_error.textContent = error.message;

        setTimeout(() => {
          create_error.textContent = "";
        }, 3000);
      });
  } else {
    {
      alert("please fill in the fields");
    }
  }

  emailInput.value = "";
  passwordInput.value = "";
}

// ----------Getting users ---------//
function getusers() {
  fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //------calling the data-----//
      users = data;
      let savedEmail = sessionStorage.getItem("loggedEmail");
      getusersId(users, savedEmail);
    })
    .catch((error) => {
      console.log(error);
    });
}
getusers();

// -------------getusersId------//
function getusersId(users, email) {
  let userId = users.find((user) => user.email === email).id;
  console.log(email);
  console.log(userId);

  sessionStorage.setItem("usersId", userId);
}

var current = null;
document.querySelector("#email").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: 0,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});
document.querySelector("#password").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: -336,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "240 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});
document.querySelector("#submit").addEventListener("focus", function (e) {
  if (current) current.pause();
  current = anime({
    targets: "path",
    strokeDashoffset: {
      value: -730,
      duration: 700,
      easing: "easeOutQuart",
    },
    strokeDasharray: {
      value: "530 1386",
      duration: 700,
      easing: "easeOutQuart",
    },
  });
});
