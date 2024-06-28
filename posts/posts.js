"use strict";

window.onload = function () {
  const postCardDiv = document.querySelector("#postCardDiv");
  const postTextArea = document.querySelector("#postTextArea");
  const createPostButton = document.querySelector("#createPostButton");
  const userProfileID = document.querySelector("#userProfileID");
  const homeLink = document.querySelector("#homeLink");
  const logoLink = document.querySelector("#logoLink");
  const usernameNav = document.querySelector("#usernameNav");
  const postLink = document.querySelector("#postLink");

  const myUsername = getLoginData().username;

  usernameNav.innerText = myUsername;

  userProfileID.href = `/profile/profile.html?username=${myUsername}`;
  homeLink.href = `/posts/posts.html?username=${myUsername}`;
  logoLink.href = `/posts/posts.html?username=${myUsername}`;
  postLink.href = `/posts/posts.html?username=${myUsername}`;

  function displayPosts() {
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        postCardDiv.innerText = "";
        for (const post of posts) {
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
          userNameA.href = `/profile/profile.html?username=${post.username}`;
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
          svg.onclick = function addAndRemoveLikes() {
            if (post.likes.find((user) => user.username == myUsername)) {
              let requestInit = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
                },
              };
              fetch(
                `http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes/${
                  post.likes.find((user) => user.username == myUsername)._id
                }`,
                requestInit
              )
                .then((response) => response.json())
                .then((post) => {
                  displayPosts();
                });
            } else {
              let likes = {
                postId: post._id,
              };
              let requestInit = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
                },
                body: JSON.stringify(likes),
              };
              fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/likes", requestInit)
                .then((response) => response.json())
                .then((likes) => {
                  displayPosts();
                });
            }
          };

          if (post.likes.find((user) => user.username == myUsername)) {
            svg.setAttribute("fill", "pink");
            svg.setAttribute("class", "bi bi-heart-fill");
            path.setAttribute("d", "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314");
          }

          if (post.username == myUsername) {
            let deleteIcon = document.createElementNS(svgNS, "svg");
            deleteIcon.style.margin = "10px";
            deleteIcon.style.cursor = "pointer";
            deleteIcon.setAttribute("xmlns", svgNS);
            deleteIcon.setAttribute("width", "16");
            deleteIcon.setAttribute("height", "16");
            deleteIcon.setAttribute("fill", "currentColor");
            deleteIcon.setAttribute("class", "bi bi-trash");
            deleteIcon.setAttribute("viewBox", "0 0 16 16");

            let pathElement = document.createElementNS(svgNS, "path");
            pathElement.setAttribute(
              "d",
              "M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1-.5-.5H6a.5.5 0 0 1-.5.5v7a.5.5 0 0 1-1 0v-7zM2.5 3a.5.5 0 0 1 .5-.5h.768l.276-1.106A1 1 0 0 1 5.018 1h5.964a1 1 0 0 1 .974.894L12.232 2.5H13a.5.5 0 0 1 0 1h-12a.5.5 0 0 1 0-1h.5v-1a.5.5 0 0 1 .5-.5zM4.118 2.5l.25-1H11.632l.25 1H4.118zM3 4.5v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9h-10z"
            );

            deleteIcon.appendChild(pathElement);
            div4.appendChild(deleteIcon);
            deleteIcon.onclick = function deletePost() {
              let requestInit = {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
                },
              };
              fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/${post._id}`, requestInit)
                .then((response) => response.json())
                .then((post) => {
                  displayPosts();
                });
            };
          }
        }
      });
  }
  function createPost() {
    let post = {
      text: postTextArea.value,
    };
    let requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("login-data")).token}`,
      },
      body: JSON.stringify(post),
    };
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", requestInit)
      .then((response) => response.json())
      .then((post) => {
        postTextArea.value = "";
        displayPosts();
      });
  }
  if (createPostButton) {
    createPostButton.onclick = createPost;
  }

  displayPosts();
};
