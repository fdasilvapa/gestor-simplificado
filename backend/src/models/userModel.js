import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const create = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const update = async (id, userData) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: userData,
  });
};

export const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
  });
};
