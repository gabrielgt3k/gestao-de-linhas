import Sequelize, { Model } from 'sequelize';

class Linha extends Model {
    static init(sequelize) {
        super.init(
            {
                numero: Sequelize.STRING,
                dono_linha: Sequelize.STRING,
                loja: Sequelize.STRING,
                ativa: Sequelize.BOOLEAN,
                operadora: Sequelize.STRING,
                ddd: Sequelize.STRING(2),
            },
            {
                sequelize,
            }
        );
    }
}

export default Linha;
