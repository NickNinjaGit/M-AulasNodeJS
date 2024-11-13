const express = require('express')
const router = express.Router()

const WorkController = require('../controllers/WorkController')

router.get('/', WorkController.showWorks)

module.exports = router