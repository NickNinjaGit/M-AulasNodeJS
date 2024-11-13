const Work = require('../models/Work')

module.exports = class WorkController {
    static async showWorks(req, res) {
        const works = await Work.getWorks()

        res.render('works/all', { works })
    }

    static createWork(req, res) {
        res.render('works/create')
    }
    static createWorkPost(req, res) {
        const name = req.body.title
        const description = req.body.description
        const image = req.body.image
        let price = req.body.price
        price = price.replace('R$', '').trim()
        const timestamp = req.body.timestamp
        const work = new Work(name, description, image, price, timestamp)

        work.save()
        res.redirect('/works')
    }
}