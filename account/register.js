"use strict";

window.onload = function () {
  const newFullName = document.querySelector("#newFullName");
  const newUsername = document.querySelector("#newUsername");
  const newpassword = document.querySelector("#newpassword");
  const registerButton = document.querySelector("#registerButton");

  function createNewUser() {
    let user = {
      fullName: newFullName.value,
      username: newUsername.value,
      password: newpassword.value,
    };
    let requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", requestInit)
      .then((response) => response.json())
      .then((user) => {
       console.log("done")
        window.location.href = `/account/login.html`;
      });
  }

  registerButton.onclick = createNewUser;
};
