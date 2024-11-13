const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");
const Task = require("../models/Task");

//Add Task
router.get("/add", TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post("/remove", TaskController.deleteTask);

//Show Tasks
router.get("/", TaskController.showTasks)

module.exports = router