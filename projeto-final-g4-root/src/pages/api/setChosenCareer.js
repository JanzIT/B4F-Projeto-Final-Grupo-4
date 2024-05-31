// /api/setChosenCareer.js

import { patchChosenCareer } from "@/services/patchChosenCareer";

export default async (req, res) => {
    if (req.method === "PATCH") {
        try {
            const { userId, career } = req.body;
            await patchChosenCareer(userId, career);
            res.status(200).json({ message: "Career updated successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
};
