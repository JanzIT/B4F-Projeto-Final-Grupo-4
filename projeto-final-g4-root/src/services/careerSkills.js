// src/services/insertSkillMental.js
import { ObjectId } from "mongodb";
import { getMongoCollection } from "../../data/mongodb";

const insertCareerSkill = async (selectedSkill, level, userId) => {
  try {
    const collection = await getMongoCollection("DBtest", "users");

    const updatedUser = await collection.findOneAndUpdate(
      {
        _id: new ObjectId(userId),
        [`chosenCareer.careerPlan.${level}.name`]: selectedSkill.name,
      },
      {
        $set: {
          [`chosenCareer.careerPlan.${level}.$.checked`]: selectedSkill.checked,
        },
        $push: {
          "userSkills.careerSkills": selectedSkill.name,
        },
      }
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export { insertCareerSkill };
