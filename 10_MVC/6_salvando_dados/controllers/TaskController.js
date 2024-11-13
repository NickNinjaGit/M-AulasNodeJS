const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) {
    //com métodos static podemos acessar uma função sem instanciar um objeto da classe.
    res.render("tasks/create");
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    };

    await Task.create(task);

    res.redirect("/tasks");
  }

  static showTasks(req, res) {
    res.render("tasks/all");
  }
};
