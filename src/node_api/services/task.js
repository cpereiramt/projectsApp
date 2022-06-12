const db = require("../configs/db-connection");

module.exports = {
  create,
  _delete,
  getAllTasksByProject,
  update,
  finishTask,
};

async function create(params) {
  const project = await db.Project.findByPk(params.projectID);
  if (!project) throw "Project not found";
  params.creationDate = new Date().toISOString();
  const task = await db.Task.create(params)
    .then((task) => {
      return task;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  await task.addProject(params.projectID);
  return task;
}

async function _delete(id) {
  const task = await db.Task.findByPk(id);
  if (!task) throw "Task not found";
  await task.destroy();
}

async function getAllTasksByProject(projectID) {
  const project = await db.Project.findByPk(projectID);
  if (!project) throw "Project not found";
  const tasks = await project.getTasks();
  if (tasks.length === 0) throw "No tasks found";
  return tasks;
}

async function update(id, params) {
  const task = await db.Task.findByPk(id);
  if (!task) throw "Task not found";
  await task.update(params);
  return task;
}

async function finishTask(id) {
  const task = await db.Task.findByPk(id);
  if (!task) throw "Task not found";
  await task.update({ finishDate: new Date().toISOString() });
  return task;
}
