import clientPromise from "./dbConnect";


export async function getMongoCollection(dbName, collectionName) {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection(collectionName);
}
