module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('linhas', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            ddd: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            numero: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dono_linha: {
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
            ativa: {
                type: Sequelize.BOOLEAN,
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
