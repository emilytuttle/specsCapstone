const {DataTypes} = require('sequelize')

const {sequelize} = require('../util/database')

module.exports = {
    Playlist : sequelize.define('playlist', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        content: DataTypes.INTEGER
    })
}
