const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('nodesequelize1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Sequelize conectado!')
} catch(err) {
    console.log("Não foi possível conectar:", err)
}

module.exports = sequelize