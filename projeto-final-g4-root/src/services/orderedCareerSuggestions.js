js 

import { getMongoCollection } from "../../data/mongodb";
import { getUserById } from "./user";




export async function findCorrelatedCareers(userId) {
    const user = await getUserById(userId)
    const collection = await getMongoCollection('DBtest', 'newCareers')
    const careers = await collection.find().toArray()
    const careersWithAffinity= careers.map(career => ({...career, affinity:calcularCorrespondencia(user,career)}) ) 
    careersWithAffinity.sort((a, b) => a.affinity < b.affinity  ? 1 : -1)
    return careersWithAffinity.slice(0, 5)
    

}

function calcularCorrespondencia(user, career) {
    return career.careerGeneralSkills.reduce((acc, keyword) => user.generalSkills.includes(keyword) ? acc + 1 : acc, 0)
}