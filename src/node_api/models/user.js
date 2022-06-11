const { DataTypes } = require("sequelize");

module.exports = userModel;

function userModel(sequelize) {
  const attributes = {
    userID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
  };

  const options = {
    defaultScope: {
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      withHash: { attributes: {} },
    },
  };
  
  
  return sequelize.define("User", attributes, options);
}
