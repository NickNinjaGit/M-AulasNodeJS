const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");

//Add Task
router.get("/add", TaskController.createTask)
router.post('/add', TaskController.createTaskSave)

//Show Tasks
router.get("/", TaskController.showTasks)

module.exports = router