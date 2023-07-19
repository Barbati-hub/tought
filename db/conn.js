const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts2','root', 'Dd@84255798', {
    host: 'localhost',
    dialect:'mysql'
})

try {
    sequelize.authenticate()
        console.log('Conectamos com Sucesso')
    } catch (err) {
        console.log(`Não conectamos com Sucesso: ${err}`)
            
}

module.exports = sequelize