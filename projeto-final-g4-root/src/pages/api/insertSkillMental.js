// src/pages/api/insertSkillMental.js
import { insertSkillMental } from "@/services/insertSkillMental";

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { selectedSkills, userId } = req.body;
            await insertSkillMental(selectedSkills, userId);
            res.status(200).json({ success: true, userId: userId, selectedSkills: selectedSkills });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
