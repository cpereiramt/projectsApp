const { projectService } = require("../services");
const validateRequest = require("../middlewares/validateRequest");
const Joi = require("joi");

function create(req, res, next) {
  req.body.userId = req.auth.sub;
  projectService
    .create(req.body)
    .then((project) => res.json(project))
    .catch(next);
}
function _delete(req, res, next) {
  req.params.userId = req.auth.sub;

  projectService
    ._delete(req.params.id, req.params.userId)
    .then(() => res.json({ message: "Project deleted" }))
    .catch(next);
}
function getAllProjectsByUser(req, res, next) {
  req.params.userId = req.auth.sub;

  projectService
    .getAllProjectsByUser(req.params.userId)
    .then((projects) => res.json(projects))
    .catch(next);
}
function update(req, res, next) {
  projectService
    .update(req.params.id, req.body)
    .then((project) => res.json(project))
    .catch(next);
}

function createSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  create,
  _delete,
  getAllProjectsByUser,
  update,
  createSchema,
};
