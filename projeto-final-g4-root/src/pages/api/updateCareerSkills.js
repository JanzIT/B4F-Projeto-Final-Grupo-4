//api/orderCareerSuggestions
import { insertCareerSkill } from "@/services/careerSkills";

export default async (req, res) => {
  if (req.method === "PATCH") {
    try {
      const { selectedSkill, level, userId } = req.body;

      if (!selectedSkill || !level || !userId) {
        return res
          .status(400)
          .json({ message: "Selected skills and user ID are required" });
      }

      // Atualizar as habilidades do usuário
      const updatedUser = await insertCareerSkill(selectedSkill, level, userId);

      if (!updatedUser) {
        return res.status(400).json({ message: "Failed to update skills" });
      }

      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.log("controllerr", error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
