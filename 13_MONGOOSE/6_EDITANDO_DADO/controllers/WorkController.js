const Work = require('../models/Work')

module.exports = class WorkController {
    static async showWorks(req, res) {
        const works = await Work.find().lean()

        res.render('works/all', { works })
    }

    static createWork(req, res) {
        res.render('works/create')
    }
    static async createWorkPost(req, res) {
        const title = req.body.title
        const description = req.body.description
        const image = req.body.image
        let price = req.body.price
        price = price.replace('R$', '').trim()
        console.log(price)
        price = parseFloat(price.replace(/,/g, '.'))
        const timestamp = req.body.timestamp

        const work = new Work({title, description, image, price, timestamp})

        await work.save()

        res.redirect('/works')
    }

    static async getWork(req, res) {

        const id = req.params.id

        const work = await Work.findById(id).lean()

        res.render('works/work', { work })
    }

//     static async removeWork(req, res) {
//         const id = req.params.id

//         await Work.removeWorkById(id)
//         res.redirect('/works')
//     }

    static async editWork(req, res) {
        const id = req.params.id

        const work = await Work.findById(id).lean()

        res.render('works/edit', { work })
    }

//    static async editWorkPost(req, res) {
//     const id = req.body.id
//     const title = req.body.title
//     const description = req.body.description
//     const image = req.body.image
//     let price = req.body.price
//     price = price.replace('R$', '').trim()
//     const timestamp = req.body.timestamp
//     const work = new Work(title, description, image, price, timestamp)
        
//     await work.updateWork(id)
//     res.redirect('/works')
//     }
}