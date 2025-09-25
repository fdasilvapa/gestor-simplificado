export const createUser = (req, res) => {

    res.status(200).json({ message: "Usuário criado com sucesso"})
}

export const getAllUsers = (req, res) => {

    res.status(200).json({ message: "Usuários listados"})
}

export const updateUser = (req, res) => {

    res.status(200).json({ message: "Usuário atualizado com sucesso"})
}

export const deleteUser = (req, res) => {

    res.status(200).json({ message: "Usuário deletado com sucesso"})
}