// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Use uma chave secreta segura em produção

const authMiddleware = async (req, res, next) => {
    const token = req.headers.cookie?.split('=')[1];

    if (!token) {
        res.writeHead(302, { Location: '/auth' }).end();
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (error) {
        res.writeHead(302, { Location: '/auth' }).end();
    }
};

export default authMiddleware;
