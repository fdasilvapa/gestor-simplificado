import * as userService from "../services/userService.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfileData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProfile = await userService.getUserProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const updateData = req.body;

    const updatedUser = await userService.updateUser(userId, updateData);
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleGenerateApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const newKey = await userService.generateApiKey(userId);

    res.status(200).json({ apiKey: newKey });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao gerar a chave de API.", error: error.message });
  }
};
