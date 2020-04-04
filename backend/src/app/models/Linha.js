import Sequelize, { Model } from 'sequelize';

class Linha extends Model {
    static init(sequelize) {
        super.init(
            {
                numero: Sequelize.STRING,
                dono_linha: Sequelize.STRING,
                email_dono: Sequelize.STRING,
                loja: Sequelize.STRING,
                status: Sequelize.STRING(10),
                operadora: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

export default Linha;
