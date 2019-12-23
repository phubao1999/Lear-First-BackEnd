const express = require("express");
const app = express();
const port = 3000;
const shortid = require('shortid');
const bodyParser = require("body-parser");
const low = require("lowdb");
const fileSync = require("lowdb/adapters/FileSync");
const adapter = new fileSync("db.json");
const db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) =>
  res.render("./index", {
    name: "Bao Tuong"
  })
);

app.get("/users", (req, res) =>
  res.render("./users/index", {
    users: db.get("users").value()
  })
);

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const userRender = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: userRender
  });
});

app.get("/users/search", (req, res) => {
  var q = req.query.q;
  var users = db.get('users').value();
  var machedUsers = users.filter(user => {
    return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
  });
  res.render('users/index', {
    users: machedUsers
  });
});

app.get("/users/create", (req, res) => {
  res.render("./users/create");
});

app.post("/users/create", (req, res) => {
  //   console.log(req.body);
  req.body.id = shortid.generate();
  db.get("users").push(req.body).write();
  res.redirect("/users");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
