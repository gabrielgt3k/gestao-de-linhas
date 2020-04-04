import { Op } from 'sequelize';
import Linha from '../models/Linha';

class LinhasOiController {
    async index(req, res) {
        const linhas = await Linha.findAll({
            where: {
                operadora: {
                    [Op.iLike]: '%Oi',
                },
            },
            attributes: [
                'id',
                'numero',
                'dono_linha',
                'email_dono',
                'loja',
                'operadora',
                'status',
            ],
            order: ['id'],
        });

        return res.json(linhas);
    }
}

export default new LinhasOiController();
