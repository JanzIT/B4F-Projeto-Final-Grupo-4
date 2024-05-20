import { getMongoCollection } from "../../data/mongodb";



export const getCenas = async () => {
    try {
        const collection = await getMongoCollection('DBtest', 'users');
        const data = await collection.find().toArray();
        return data
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        throw error;
    }
}










// import dbConnect from "../../data/dbConnect";


// export async function getCenas() {
//     const DBtest = 'DBtest';
//     const users = 'users';
//     const db = await dbConnect();
//     const collection = db.collection(users);

//     const data = await collection.find().toArray(); // exemplo
//     return data;
// }