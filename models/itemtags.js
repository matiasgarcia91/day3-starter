"use strict";
module.exports = (sequelize, DataTypes) => {
  const itemTags = sequelize.define(
    "itemTags",
    {
      todoItemId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER
    },
    {}
  );
  itemTags.associate = function(models) {
    itemTags.belongsTo(models.tag);
    itemTags.belongsTo(models.todoItem);
  };
  return itemTags;
};

// Establish relations between Tag - TodoItem DONE
// Establish relations to join table (from both models) <==

// Add relations to the models
// Modify a bit the migration for the join table. DONE
