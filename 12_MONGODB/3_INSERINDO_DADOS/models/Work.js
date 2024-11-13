const conn = require('../db/conn')

class Work {

    constructor(title, description, price, timestamp) {
        this.title = title
        this.description = description
        this.price = price
        this.timestamp = timestamp
    }

    save() {
        const work = conn.db().collection('works').insertOne({
            title: this.title,
            description: this.description,
            price: this.price,
            timestamp: this.timestamp
        })

        return work

    }
}

module.exports = Work