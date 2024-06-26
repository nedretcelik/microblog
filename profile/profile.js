const postCardDiv = document.querySelector("#postCardDiv");
const userProfileID = document.querySelector("#userProfileID");
const homeLink = document.querySelector("#homeLink");
const logoLink = document.querySelector("#logoLink");
const fullNameH1 = document.querySelector("#fullNameH1");
const usernameH6 = document.querySelector("#usernameH6");
const bioTextP = document.querySelector("#bioTextP");
const editProfileA = document.querySelector("#editProfileA");
const updateUserInfo = document.querySelector("#updateUserInfo");

const fullNameEdit = document.querySelector("#fullNameEdit");
const usernameEdit = document.querySelector("#usernameEdit");
const bioEdit = document.querySelector("#bioEdit");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

if (userProfileID) {
  userProfileID.href = `/profile/profile.html?username=${username}`;
}

if (homeLink) {
  homeLink.href = `/posts/posts.html?username=${username}`;
}
if (logoLink) {
  logoLink.href = `/posts/posts.html?username=${username}`;
}
if (editProfileA) {
  editProfileA.href = `/profile/edit-profile.html?username=${username}`;
}

function getUserData() {
  console.log("xyz");
  fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
    },
  })
    .then((response) => response.json())
    .then((user) => {
      if (fullNameH1) {
        fullNameH1.textContent = user.fullName;
        usernameH6.textContent = "@" + user.username;
        bioTextP.textContent = user.bio;
      }

      if (fullNameEdit) {
        fullNameEdit.value = user.fullName;
        usernameEdit.value = user.username;
        bioEdit.value = user.bio;
      }
    });
}

function displayUsersPostOnly() {
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
    },
  })
    .then((response) => response.json())
    .then((posts) => {
      const userPosts = posts.filter((post) => post.username == username);
      postCardDiv.innerText = "";
      for (const post of userPosts) {
        let div1 = document.createElement("div");
        div1.classList.add("row");
        postCardDiv.appendChild(div1);

        let div2 = document.createElement("div");
        div2.classList.add("col-md-12");
        div1.appendChild(div2);

        let div3 = document.createElement("div");
        div3.classList.add("card", "mb-3", "card-border");
        div2.appendChild(div3);

        let div4 = document.createElement("div");
        div4.classList.add("card-body");
        div3.appendChild(div4);

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        div4.appendChild(cardTitle);

        let div5 = document.createElement("div");
        div5.classList.add("row", "align-items-center");
        cardTitle.appendChild(div5);

        let div6 = document.createElement("div");
        div6.classList.add("col", "d-flex", "align-items-center");
        div5.appendChild(div6);

        let userNameA = document.createElement("a");
        userNameA.classList.add("text-white", "d-flex", "align-items-center");
        userNameA.href = "#";
        div6.appendChild(userNameA);

        let userImage = document.createElement("img");
        userImage.classList.add("rounded-circle", "mx-2");
        userImage.src = "../images/cat.jpg";
        userImage.style.width = "30px";
        userImage.style.height = "30px";
        userNameA.appendChild(userImage);

        let div7 = document.createElement("div");
        userNameA.appendChild(div7);

        let fullName = document.createElement("span");
        fullName.textContent = post.username;
        div7.appendChild(fullName);

        let br = document.createElement("br");
        div7.appendChild(br);

        let spanUsername = document.createElement("span");
        spanUsername.id = "username";
        spanUsername.classList.add("text-muted");
        spanUsername.style.fontSize = "0.9em";
        spanUsername.textContent = `@${post.username}`;
        div7.appendChild(spanUsername);

        let postTextP = document.createElement("p");
        postTextP.classList.add("card-text");
        postTextP.textContent = post.text;
        div4.appendChild(postTextP);

        let svgNS = "http://www.w3.org/2000/svg";
        let svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-heart");
        svg.setAttribute("viewBox", "0 0 16 16");

        let path = document.createElementNS(svgNS, "path");
        path.setAttribute(
          "d",
          "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
        );

        svg.appendChild(path);
        div4.appendChild(svg);
        svg.addEventListener("click", function () {
          svg.setAttribute("fill", "pink");
        });
      }
    });
}

function editUserInformation() {
  let user = {
    fullName: fullNameEdit.value,
    bio: bioEdit.value,
  };
  let requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`
    },
    body: JSON.stringify(user),
  };
  fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`, requestInit)
    .then((response) => response.json())
    .then((user) => {
      window.location.href = `/profile/profile.html?username=${username}`;
    });
}

if (fullNameH1) {
  displayUsersPostOnly();
}

if (updateUserInfo) {
  updateUserInfo.onclick = editUserInformation;
}

getUserData();
