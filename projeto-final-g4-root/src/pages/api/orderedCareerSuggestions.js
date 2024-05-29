
import { insertSkillMental } from "@/services/insertSkillMental";
import { findCorrelatedCareers } from "@/services/orderedCareerSuggestions";
import { getUserById } from "@/services/user";


export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { selectedSkills, userId } = req.body;

      if (!selectedSkills || !userId) {
        return res
          .status(400)
          .json({ message: "Selected skills and user ID are required" });
      }

      // Atualizar as habilidades do usuário
      const success = await insertSkillMental(selectedSkills, userId);

      if (!success) {
        return res.status(400).json({ message: "Failed to update skills" });
      }

      // Recuperar o usuário atualizado
      const updatedUser = await getUserById(userId);

      // Buscar as carreiras correlacionadas após a atualização
      const careers = await findCorrelatedCareers(updatedUser);

      res.status(200).json({ careers });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
