import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            senha: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Não foi possível validar os dados' });
        }

        const { email, senha } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            res.status(401).json({ error: 'Usuário não encontrado' });
        }

        if (!(await user.checkPassword(senha))) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const { id, nome } = user;

        return res.json({
            user: {
                id,
                nome,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
