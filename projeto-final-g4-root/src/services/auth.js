// src/services/auth.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getMongoCollection } from '../../data/mongodb';

const SECRET_KEY = 'your_secret_key'; // Use uma chave secreta segura em produção

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
        
        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        const userToInsert = {
            ...userInfo,
            password: hashedPassword
        };

        const result = await collection.insertOne(userToInsert);
        return result.insertedId;
    } catch (error) {
        throw error;
    }
};

const authUser = async (email, password) => {
    try {
        const collection = await getMongoCollection('DBtest', 'users');
        const user = await collection.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Comparar a senha fornecida com a senha criptografada no banco de dados
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Gerar um token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        return { user, token };
    } catch (error) {
        throw error;
    }
};

export { getAllUsersFromDatabase, registerUser, authUser };
