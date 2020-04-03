import * as Yup from 'yup';
import Linha from '../models/Linha';

class LinhaController {
    async index(req, res) {
        const linhas = await Linha.findAll({
            attributes: [
                'id',
                'ddd',
                'numero',
                'operadora',
                'dono_linha',
                'loja',
                'ativa',
            ],
            order: ['id'],
        });

        return res.json(linhas);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            ddd: Yup.string()
                .max(2)
                .required(),
            numero: Yup.string().required(),
            dono_linha: Yup.string().required(),
            loja: Yup.string().required(),
            operadora: Yup.string().required(),
            ativa: Yup.boolean().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const linhaExiste = await Linha.findOne({
            where: {
                numero: req.body.numero,
                ddd: req.body.ddd,
            },
        });

        if (linhaExiste) {
            return res.status(400).json({ error: 'Este número já existe' });
        }

        const {
            id,
            ddd,
            numero,
            dono_linha,
            loja,
            ativa,
            operadora,
        } = await Linha.create(req.body);
        return res.json({
            id,
            ddd,
            numero,
            dono_linha,
            loja,
            ativa,
            operadora,
        });
    }

    async update(req, res) {
        const { id } = req.params;
        const { numero, ddd } = req.body;

        const linha = await Linha.findByPk(id);

        if (!linha) {
            return res.status(400).json({ error: 'Linha não encontrada' });
        }

        if (linha.numero !== numero || linha.ddd !== ddd) {
            const linhaExiste = await Linha.findOne({
                where: {
                    numero,
                    ddd,
                },
            });
            if (linhaExiste) {
                return res.status(400).json({ error: 'Este número já existe' });
            }
        }

        const { dono_linha, operadora, ativa } = await linha.update(req.body);

        return res.json({ id, ddd, numero, dono_linha, operadora, ativa });
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
