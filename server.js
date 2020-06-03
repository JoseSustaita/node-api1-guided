const express = require("express");
const db = require("./database.js");

const server = express();

server.get("/", (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

server.get("/users/:id", (req, res) => {
  // The param variable matches up to the name of our URL param above
  const user = db.getUserById(req.params.id);
  // Since we're now taking in values from the client,
  // We need to make sure the value is valid before trying to use it
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: " need a name for the user",
    });
  }
  const newUser = db.createUser({
    name: req.body.name,
  });
  res.status(201).json(newUser);
});

server.put("/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    db.updateUser(user.id, {
      name: req.body.name || user.name,
    });
  } else {
    req.status(400).json({
      message: "User not found",
    });
  }
});

server.listen(8080, () => {
  console.log("Server Started");
});
