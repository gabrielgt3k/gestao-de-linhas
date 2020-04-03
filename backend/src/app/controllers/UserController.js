import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            senha: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const userExist = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (userExist) {
            return res.status(400).json({ error: 'Usuário já existe' });
        }

        const { id, nome, email, admin } = await User.create(req.body);

        return res.json({
            id,
            nome,
            email,
            admin,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            senha_antiga: Yup.string().min(6),
            senha: Yup.string()
                .min(6)
                .when('senha_antiga', (senha_antiga, field) =>
                    senha_antiga ? field.required() : field
                ),
            confirmarSenha: Yup.string().when('senha', (senha, field) =>
                senha ? field.required().oneOf(Yup.ref(['senha'])) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const { email, senha_antiga } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                return res.status(400).json({ error: 'Usuário já existe' });
            }
        }

        if (senha_antiga && !(await user.checkPassword(senha_antiga))) {
            res.status(401).json({ error: 'Senha inválida' });
        }

        const { id, nome, admin } = await user.update(req.body);

        return res.json({
            id,
            nome,
            email,
            admin,
        });
    }
}

export default new UserController();
