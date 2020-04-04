module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('linhas', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            numero: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dono_linha: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email_dono: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            loja: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            operadora: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('linhas');
    },
};
