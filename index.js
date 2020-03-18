const express = require("express");
const User = require("./models").user;
const TodoList = require("./models").todoList;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // bodyparser middleware.

app.listen(PORT, () => console.log("server running!"));

app.post("/echo", (request, response, next) => {
  const body = request.body;
  response.json(body);
});

app.get("/users", async (req, res, next) => {
  try {
    console.log("Looking for users!");
    const users = await User.findAll();
    if (users.length === 0) {
      res.status(404).send("No users found");
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  const { email, phone, password } = req.body;
  console.log({ email, phone, password });
  try {
    const user = await User.create({ email, password, phone });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.get("/users/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    console.log("looking for user: ", id);
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send("No user found");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/users/:id/lists", async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, { include: [TodoList] });
    res.json(user.todoLists);
  } catch (e) {
    next(e);
  }
});
