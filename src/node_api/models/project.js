const { DataTypes } = require("sequelize");


function projectModel(sequelize) {
    const attributes = {
        projectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
};

const options = {};

return sequelize.define("Project", attributes, options);
}

module.exports = projectModel;