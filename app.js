const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

const users = [
  { id: 1, name: "Bao" },
  { id: 2, name: "Nhat Linh" },
  { id: 3, name: "Quang Hung" }
];

app.get("/", (req, res) =>
  res.render("./index", {
    name: "Bao Tuong"
  })
);

app.get("/users", (req, res) =>
  res.render("./users/index", {
    users: users
  })
);

app.get("/users/search", (req, res) => {
//   console.log(req);
  var q = req.query.q;
  var machedUsers = users.filter(user => {
    return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
  });
  res.render("users/index", {
    users: machedUsers
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
