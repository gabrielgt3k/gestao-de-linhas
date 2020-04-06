import * as Yup from 'yup';
import Linha from '../models/Linha';

class LinhaController {
    async index(req, res) {
        const linhas = await Linha.findAndCountAll({
            attributes: [
                'id',
                'numero',
                'operadora',
                'dono_linha',
                'email_dono',
                'loja',
                'status',
            ],
            order: ['id'],
        });

        res.setHeader('X-Total-Count', linhas.count);

        return res.json(linhas.rows);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            numero: Yup.string().required(),
            dono_linha: Yup.string(),
            email_dono: Yup.string().email(),
            loja: Yup.string().required(),
            operadora: Yup.string().required(),
            status: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const linhaExiste = await Linha.findOne({
            where: {
                numero: req.body.numero,
            },
        });

        if (linhaExiste) {
            return res.status(400).json({ error: 'Este número já existe' });
        }

        const {
            id,
            numero,
            dono_linha,
            email_dono,
            loja,
            status,
            operadora,
        } = await Linha.create(req.body);
        return res.json({
            id,
            numero,
            email_dono,
            dono_linha,
            loja,
            status,
            operadora,
        });
    }

    async update(req, res) {
        let { id } = req.params;
        id = parseInt(id, 10);
        const { numero } = req.body;

        const linha = await Linha.findByPk(id);

        if (!linha) {
            return res.status(400).json({ error: 'Linha não encontrada' });
        }

        if (linha.numero !== numero) {
            const linhaExiste = await Linha.findOne({
                where: {
                    numero,
                },
            });
            if (linhaExiste) {
                return res.status(400).json({ error: 'Este número já existe' });
            }
        }

        const {
            dono_linha,
            email_dono,
            operadora,
            loja,
            status,
        } = await linha.update(req.body);

        return res.json({
            id,
            numero,
            dono_linha,
            email_dono,
            operadora,
            loja,
            status,
        });
    }

    async delete(req, res) {
        const linha = await Linha.findByPk(req.params.id);

        if (!linha) {
            return res.status(400).json({ error: 'Linha não encontrada' });
        }

        await linha.destroy();

        return res.json({ message: 'Linha excluída com sucesso' });
    }
}

export default new LinhaController();
