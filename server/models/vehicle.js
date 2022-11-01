const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Vehicle : sequelize.define('vehicle', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        make: DataTypes.STRING,
        model: DataTypes.STRING,
        year: DataTypes.STRING,
        license: DataTypes.STRING
    })
}
