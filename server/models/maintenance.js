const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Maintenance : sequelize.define('maintenance', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        service: DataTypes.STRING,
        date: DataTypes.DATE,
        odometer: DataTypes.STRING,
        notes: DataTypes.STRING
        
    })
}
