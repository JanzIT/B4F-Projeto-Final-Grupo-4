import dbConnect from "../../lib/dbConnect";

export async function getCenas() {
    const DBtest = 'DBtest';
    const users = 'users';
    const db = await dbConnect();
    const collection = db.collection(users);

    const data = await collection.find().toArray(); // exemplo
    return data;
}
