// src/pages/api/auth.js
import { registerUser, authUser } from '../../services/auth';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            const user = await authUser(email, password);
            res.status(200).json({ success: true, message: 'Authentication successful!', user });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            const { name, email, password, keywords, newSkills, careerSuggestions, chosenCareer } = req.body;
            const userInfo = { name, email, password, keywords, newSkills, careerSuggestions, chosenCareer: chosenCareer || null };
            await registerUser(userInfo);
            res.status(201).json({ success: true, message: 'Success! User Registered' });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
};
