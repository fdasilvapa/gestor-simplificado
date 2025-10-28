import * as userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (userData) => {
  const { email, password, name } = userData;

  if (!name || !email || !password) {
    throw new Error("Nome, e-mail e senha são obrigatórios.");
  }

  if (name.length > 60) {
    throw new Error("O nome deve ter no máximo 60 caracteres.");
  }
  if (email.length > 60) {
    throw new Error("O e-mail deve ter no máximo 60 caracteres.");
  }
  if (password.length < 8) {
    throw new Error("A senha deve ter no mínimo 8 caracteres.");
  }
  if (password.length > 20) {
    throw new Error("A senha deve ter no máximo 20 caracteres.");
  }

  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    throw new Error("Este e-mail já está em uso.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    email,
    name,
    password: hashedPassword,
  });

  delete newUser.password;
  return newUser;
};

export const login = async (email, password) => {
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return { token };
};

export const updateUser = async (userId, updateData) => {
  const { email, password, name } = updateData;

  const dataToUpdate = {};

  if (name) {
    if (name.length > 60) {
      throw new Error("O nome deve ter no máximo 60 caracteres.");
    }
    dataToUpdate.name = name;
  }

  if (email) {
    if (email.length > 60) {
      throw new Error("O e-mail deve ter no máximo 60 caracteres.");
    }
    const existingUser = await userModel.findByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      throw new Error("Este e-mail já está em uso por outra conta.");
    }
    dataToUpdate.email = email;
  }

  if (password) {
    if (password.length < 8) {
      throw new Error("A senha deve ter no mínimo 8 caracteres.");
    }
    if (password.length > 20) {
      throw new Error("A senha deve ter no máximo 20 caracteres.");
    }
    dataToUpdate.password = await bcrypt.hash(password, 10);
  }

  if (Object.keys(dataToUpdate).length === 0) {
    throw new Error("Nenhum dado fornecido para atualização.");
  }

  const updatedUser = await userModel.update(userId, dataToUpdate);

  delete updatedUser.password;
  return updatedUser;
};

export const getUserProfile = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  delete user.password;
  return user;
};
