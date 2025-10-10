import jwt from 'jsonwebtoken';
import * as userModel from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido. '});
    }
};

export default authMiddleware;
