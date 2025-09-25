export const createUser = (req, res) => {
    // Lógica para criar usuário virá aqui...
    res.status(201).json({ message: "Usuário criado com sucesso" });
};

export const getAllUsers = (req, res) => {
    // Lógica para listar usuários virá aqui...
    res.status(200).json({ message: "Usuários listados" });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    // Lógica para atualizar usuário virá aqui...
    res.status(200).json({ message: `Usuário com ID ${id} atualizado com sucesso` });
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    // Lógica para deletar usuário virá aqui...
    res.status(200).json({ message: `Usuário com ID ${id} deletado com sucesso` });
};