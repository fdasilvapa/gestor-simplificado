import * as userService from '../services/userService.js';

export const createUser = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const updateData = req.body;

        const updatedUser = await userService.updateUser(userId, updateData);
        res.status(200).json({ message: 'Usuário atualizado com sucesso' , user: updatedUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
};

// Funcionalidade futura
// export const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     // Lógica para deletar usuário virá aqui...
//     res.status(200).json({ message: `Usuário com ID ${id} deletado com sucesso` });
// };
