"use strict"
const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        tableName: 'task',
        underscored: true,
        timestamps: true
    })

    return Task
}