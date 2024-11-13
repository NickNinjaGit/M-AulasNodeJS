const conn = require('../db/conn')

class Work {

    constructor(title, description, image, price, timestamp) {
        this.title = title
        this.description = description
        this.image = image
        this.price = price
        this.timestamp = timestamp
    }

    save() {
        const work = conn.db().collection('works').insertOne({
            title: this.title,
            description: this.description,
            image: this.image,
            price: this.price,
            timestamp: this.timestamp
        })

        return work

    }

    static getWorks() {
        const works = conn.db().collection('works').find().toArray()

        return works
    }
}

module.exports = Work