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

  static async deleteTask(req, res) {
    const id = req.body.id;

    await Task.destroy({ where: { id: id } });

    res.redirect("/tasks");
  }

  static async updateTask(req, res) {
    const id = req.params.id;

    const task = await Task.findOne({ where: { id: id }, raw: true });

    res.render("tasks/edit", { task });
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render("tasks/all", { tasks });
  }
};
