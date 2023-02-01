const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam aut autem eius similique! Soluta, nulla est corrupti sapiente, optio nam quisquam alias laborum voluptatibus minus possimus consequatur, blanditiis culpa facilis sit assumenda. Corrupti delectus ea amet mollitia, voluptatibus reprehenderit doloremque dignissimos eligendi enim ipsam! Itaque porro rerum placeat sint sequi nesciunt cumque ipsum laudantium? Non, aspernatur deserunt eius in nemo provident officia sapiente, ipsum accusamus, eaque numquam placeat illo repudiandae deleniti delectus. Quos aliquid sit odit temporibus voluptas asperiores, dolor quas obcaecati neque. Praesentium velit aperiam culpa, rerum voluptate consequuntur commodi vitae accusantium nostrum ipsa earum. Esse, quis mollitia!";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam aut autem eius similique! Soluta, nulla est corrupti sapiente, optio nam quisquam alias laborum voluptatibus minus possimus consequatur, blanditiis culpa facilis sit assumenda. Corrupti delectus ea amet mollitia, voluptatibus reprehenderit doloremque dignissimos eligendi enim ipsam! Itaque porro rerum placeat sint sequi nesciunt cumque ipsum laudantium? Non, aspernatur deserunt eius in nemo provident officia sapiente, ipsum accusamus, eaque numquam placeat illo repudiandae deleniti delectus. Quos aliquid sit odit temporibus voluptas asperiores, dolor quas obcaecati neque. Praesentium velit aperiam culpa, rerum voluptate consequuntur commodi vitae accusantium nostrum ipsa earum. Esse, quis mollitia!";
// const contactContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam aut autem eius similique! Soluta, nulla est corrupti sapiente, optio nam quisquam alias laborum voluptatibus minus possimus consequatur, blanditiis culpa facilis sit assumenda. Corrupti delectus ea amet mollitia, voluptatibus reprehenderit doloremque dignissimos eligendi enim ipsam! Itaque porro rerum placeat sint sequi nesciunt cumque ipsum laudantium? Non, aspernatur deserunt eius in nemo provident officia sapiente, ipsum accusamus, eaque numquam placeat illo repudiandae deleniti delectus. Quos aliquid sit odit temporibus voluptas asperiores, dolor quas obcaecati neque. Praesentium velit aperiam culpa, rerum voluptate consequuntur commodi vitae accusantium nostrum ipsa earum. Esse, quis mollitia!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (request, response) {
  response.render("home", {
    homeContent: homeStartingContent,
    updates: posts
  });
});

app.get("/about", function (request, response) {
  response.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (request, response) {
  response.render("contact");
});

app.get("/publish", function (request, response) {
  response.render("publish");
});

app.post("/publish", function (request, response) {
  let post = {
    title: request.body.postTitle,
    content: request.body.postContent
  };
  posts.push(post);
  response.redirect("/");
});

app.get("/posts/:urlRequest", function (req, res) {
  var para = _.lowerCase(req.params.urlRequest);
  posts.forEach(function (post) {
    let storedTitle = _.lowerCase(post.title);
    if (storedTitle === para) {
      // console.log("Match Found!");
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on 3000");
});