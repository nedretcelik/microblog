"use strict";

window.onload = function () {
  const postCardDiv = document.querySelector("#postCardDiv");

  function displayPosts() {
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5lZHJldGMiLCJpYXQiOjE3MTkzMzQ0MTcsImV4cCI6MTcxOTQyMDgxN30.rWNQyF3x47STLrY6DYXMKF8iJo3gHp1QkuJF1UMxIoc",
      },
    })
      .then((response) => response.json())
      .then((posts) => {
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
        }
      });
  }

  displayPosts();
};
