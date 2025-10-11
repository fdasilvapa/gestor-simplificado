import * as userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (userData) => {
    const { email, password, name } = userData;

    if (!email || !password) {
        throw new Error('E-mail e senha são obrigatórios.');
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new Error('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        email,
        name,
        password: hashedPassword,
    });

    delete newUser.password;
    return newUser;
}

export const login = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas.');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '8h' },
    );

    return { token };
}

export const updateUser = async (userId, updateData) => {
    const { email, password, name } = updateData;

    if (email) {
        const existingUser = await userModel.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
            throw new Error('Este e-mail já está em uso por outra conta.');
        }
    }

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;

    if (password) {
        dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(dataToUpdate).length === 0) {
        throw new Error('Nenhum dado fornecido para atualização.');
    }

    const updatedUser = await userModel.update(userId, dataToUpdate);

    delete updatedUser.password;
    return updatedUser;
};

export const getUserProfile = async (userId) => {
    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    delete user.password;
    return user;
}
