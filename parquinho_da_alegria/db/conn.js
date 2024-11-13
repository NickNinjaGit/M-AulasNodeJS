const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("parquinho_alegria", "root", "",{
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log("Sequelize connected")
} catch(error) {
    console.log("Error: cant connect to Sequelize: ", error)
}

module.exports = sequelize;