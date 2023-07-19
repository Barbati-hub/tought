const { DataTypes } =  require('sequelize')

const db = require('../db/conn')

// User
const User = require('./User')

 const Tought = db.define('Tought', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
 })

 Tought.belongsTo(User)// Um pensamento tem um usuario e então usa o belongsTO
 User.hasMany(Tought)// Um usuario tem vários pensamentos usa o hasMany

 module.exports = Tought
