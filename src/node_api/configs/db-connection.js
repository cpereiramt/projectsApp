const config = require("../configs/config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  const { User, Task, Project } = require("../models");

  db.User = User(sequelize);
  db.Task = Task(sequelize);
  db.Project = Project(sequelize);

  db.User.belongsToMany(db.Project, {
    through: "User_Project",
    foreignKey: "user_ID",
  });
  db.Project.belongsToMany(db.User, {
    through: "User_Project",
    foreignKey: "project_ID",
  });

  db.Project.belongsToMany(db.Task, {
    through: "Project_Task",
    foreignKey: "project_ID",
  });
  db.Task.belongsToMany(db.Project, {
    through: "Project_Task",
    foreignKey: "task_ID",
  });
  await sequelize.sync();
}
