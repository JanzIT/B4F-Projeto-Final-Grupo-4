import { ObjectId } from "mongodb";
import { getMongoCollection } from "../../data/mongodb";


export async function getUserById(userId) {
  const collection = await getMongoCollection("DBtest", "users");
  const user = await collection.findOne({ _id: new ObjectId(userId) });
  return user;
}
