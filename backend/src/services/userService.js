import * as userModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { use } from 'react';

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
