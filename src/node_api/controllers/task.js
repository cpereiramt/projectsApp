const { taskService } = require("../services");
const validateRequest = require("../middlewares/validateRequest");
const Joi = require("joi");

function create(req, res, next) {
  taskService
    .create(req.body)
    .then((task) => res.json(task))
    .catch(next);
}
function _delete(req, res, next) {
  taskService
    ._delete(req.params.id)
    .then(() => res.json({ message: "task deleted" }))
    .catch(next);
}
function getAllTasksByProject(req, res, next) {
  console.error(req.params.projectID);
  taskService
    .getAllTasksByProject(req.params.projectID)
    .then((tasks) => res.json(tasks))
    .catch(next);
}
function update(req, res, next) {
  taskService
    .update(req.params.id, req.body)
    .then((task) => res.json(task))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    description: Joi.string().required(),
    finishDate: Joi.date(),
    projectID: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function finishTask(req, res, next) {
  taskService
    .finishTask(req.params.id)
    .then((task) => res.json(task))
    .catch(next);
}
module.exports = {
  create,
  _delete,
  getAllTasksByProject,
  update,
  createSchema,
  finishTask,
};
