const Work = require('../models/Work')

module.exports = class WorkController {
    static showWorks(req, res) {
        res.render('works/all')
    }
}