import express from 'express'
import userRoutes from './routes'

const app = express()
app.use(express.json())

app.use('/usuarios', userRoutes)

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
