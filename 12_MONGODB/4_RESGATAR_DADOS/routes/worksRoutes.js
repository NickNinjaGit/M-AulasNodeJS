const express = require('express')
const router = express.Router()

const WorkController = require('../controllers/WorkController')

router.get('/create', WorkController.createWork)
router.post('/create', WorkController.createWorkPost)
router.get('/', WorkController.showWorks)


module.exports = router