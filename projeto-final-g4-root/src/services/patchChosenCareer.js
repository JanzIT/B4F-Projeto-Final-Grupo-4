// /services/patchChosenCareer.js
import { ObjectId } from "mongodb";
import { getMongoCollection } from "../../data/mongodb";


export async function patchChosenCareer(userId, career) {
    const collection = await getMongoCollection("DBtest", "users");
    console.log(career, userId)
    await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { chosenCareer: career } }
    );
}
