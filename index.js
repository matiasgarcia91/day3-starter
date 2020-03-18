const express = require("express");
const app = express();
const PORT = 4000;
const User = require("./models").user;

app.use(express.json());

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(PORT, () => console.log("app started"));
