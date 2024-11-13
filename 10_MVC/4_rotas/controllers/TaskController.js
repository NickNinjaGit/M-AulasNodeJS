const Task = require("../models/Task");

module.exports = class TaskController {
  static createTask(req, res) { //com métodos static podemos acessar uma função sem instanciar um objeto da classe.
    res.render("tasks/create");
  }
  static showTasks(req, res) { 
    res.render("tasks/all");
  }
};
