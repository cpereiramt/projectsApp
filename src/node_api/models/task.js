const { DataTypes } = require("sequelize");

module.exports = taskModel;

function taskModel(sequelize) {
  const attributes = {
    taskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    creationDate: { type: DataTypes.DATE, allowNull: false },
    finishDate: { type: DataTypes.DATE, allowNull: false },
  };

  const options = {};

  return sequelize.define("Task", attributes, options);
}
