const Work = require('../models/Work')

module.exports = class WorkController {
    static showWorks(req, res) {
        res.render('works/all')
    }

    static createWork(req, res) {
        res.render('works/create')
    }
    static createWorkPost(req, res) {
        const name = req.body.title
        const description = req.body.description
        const price = req.body.price
        const timestamp = req.body.timestamp
        const work = new Work(name, description, price, timestamp)

        work.save()
        res.redirect('/works')
    }
}