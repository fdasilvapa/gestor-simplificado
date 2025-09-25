import express from 'express'
import { createUser, getAllUsers, updateUser, deleteUser } from './controllers/userController.js'

const router = express.Router()

router.post('/cadastro', createUser)
router.get('/listar', createUser)
router.put('/atualizar', createUser)
router.delete('/deletar', createUser)

export default router