// src/services/insertSkillMental.js
import { ObjectId } from "mongodb";
import { getMongoCollection } from "../../data/mongodb";

const insertSkillMental = async (selectedSkills, userId) => {
    try {
        console.log("cenAAAAAAAAs",selectedSkills, userId)
        const collection = await getMongoCollection('DBtest', 'users');

        const result = await collection.updateOne(
            { _id: new ObjectId(userId) },
            { 
                $push: { 
                    'userSkills.generalSkills': { $each: selectedSkills } 
                } 
            }
        );

        return result.modifiedCount > 0; 
    } catch (error) {
        throw error;
    }
};

export { insertSkillMental };
