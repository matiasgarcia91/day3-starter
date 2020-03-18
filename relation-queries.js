const User = require("./models").user;
const TodoList = require("./models").todoList;
const TodoItem = require("./models").todoItem;
const Tag = require("./models").tag;

async function getUsersWithLists() {
  const allUsers = await User.findAll({ include: [TodoList] });
  const parsedUsers = allUsers.map(user => user.get({ plain: true }));
  console.log(parsedUsers);
}

async function getListsWithItems() {
  const lists = await TodoList.findAll({ include: [TodoItem] });
  const parsedLists = lists.map(list => list.get({ plain: true }));
  console.log(parsedLists);
}

async function userWithListAndItems(id) {
  const user = await User.findByPk(id, {
    include: [
      {
        model: TodoList,
        attributes: ["name"],
        include: [{ model: TodoItem, attributes: ["task"] }]
      }
    ]
  });
  console.log(user.get({ plain: true }));
}

async function itemsWithTags() {
  const items = await TodoItem.findAll({ include: [Tag] });
  const parsedItems = items.map(item => item.get({ plain: true }));
  console.log(parsedItems);
}

itemsWithTags();
