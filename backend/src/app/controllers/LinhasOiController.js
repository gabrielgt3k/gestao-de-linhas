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
                'ddd',
                'numero',
                'dono_linha',
                'loja',
                'operadora',
                'ativa',
            ],
            order: ['id'],
        });

        return res.json(linhas);
    }
}

export default new LinhasOiController();
