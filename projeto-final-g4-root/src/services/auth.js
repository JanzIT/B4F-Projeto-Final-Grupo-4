// src/services/auth.js
import { getMongoCollection } from '../../data/mongodb';

const getAllUsersFromDatabase = async () => {
    try {
        const collection = await getMongoCollection('DBtest', 'users');
        const allUsers = await collection.find().toArray();
        return allUsers;
    } catch (error) {
        throw error;
    }
};

const registerUser = async (userInfo) => {
    try {
        const collection = await getMongoCollection('DBtest', 'users');
        const existingUser = await collection.findOne({ email: userInfo.email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const result = await collection.insertOne(userInfo);
        return result.insertedId;
    } catch (error) {
        throw error;
    }
};

const authUser = async (email, password) => {
    try {
        const collection = await getMongoCollection('DBtest', 'users');
        const user = await collection.findOne({ email, password });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

export { getAllUsersFromDatabase, registerUser, authUser };
