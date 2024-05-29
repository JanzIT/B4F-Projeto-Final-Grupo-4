import { ObjectId } from "mongodb";
import { getMongoCollection } from "../../data/mongodb";

export async function findCorrelatedCareers(user) {
  console.log("CARRERSUG! /services/fincorrelatedcareers user = Ok")
  const collection = await getMongoCollection("DBtest", "newCareer");
  const careers = await collection.find().toArray();
  const careersWithAffinity = careers.map((career) => ({
    ...career,
    affinity: calcularCorrespondencia(user, career),
  }));
  careersWithAffinity.sort((a, b) => b.affinity - a.affinity);
  const orderedCareers = careersWithAffinity.slice(0, 5);

  await updateCareerSuggestions(user._id, orderedCareers);

  return orderedCareers;
}

function calcularCorrespondencia(user, career) {
  return career.careerGeneralSkills.reduce(
    (acc, generalSkill) =>
      user.userSkills.generalSkills.includes(generalSkill) ? acc + 1 : acc,
    0
  );
}

async function updateCareerSuggestions(userId, careerSuggestions) {
  const collection = await getMongoCollection("DBtest", "users");
  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { careerSuggestions } }
  );
}
