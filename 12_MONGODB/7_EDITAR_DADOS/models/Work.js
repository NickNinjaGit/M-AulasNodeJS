const conn = require('../db/conn')

const {ObjectId} = require('mongodb')

class Work {

    constructor(title, description, image, price, timestamp) {
        this.title = title
        this.description = description
        this.image = image
        this.price = price
        this.timestamp = timestamp
    }

    save() {
        const work = conn.db().collection('work').insertOne({
            title: this.title,
            description: this.description,
            image: this.image,
            price: this.price,
            timestamp: this.timestamp
        })

        return work

    }

    static getWorks() {
        const works = conn.db().collection('work').find().toArray()
        return works
    }

    static async getWorkById(id) {
        const work = await conn.db()
        .collection('work')
        .findOne({ _id:  ObjectId.createFromHexString(id)})

        return work
    }

    static async removeWorkById(id) {
        await conn.db().collection('work').deleteOne({ _id: ObjectId.cacheHexString(id)})
        return
    }

    updateWork(id) {
        conn
        .db()
        .collection('work')
        .updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: this })
        return
   }
}

module.exports = Work