// src/pages/api/auth.js
import { registerUser, authUser } from '../../services/auth';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { userInfo } = req.body;
            await registerUser(userInfo);
            res.status(201).json({ message: 'Success! User Registered' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const { email, password } = req.body;
            const user = await authUser(email, password);
            res.status(200).json({ message: 'Authentication successful!', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
