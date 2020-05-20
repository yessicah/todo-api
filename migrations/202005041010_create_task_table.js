'use-strict'

const TABLE_NAME = 'task'

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable(TABLE_NAME, {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            done: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            }
        }),
    down: (queryInterface) => queryInterface.dropTable(TABLE_NAME)
}