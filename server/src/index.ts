
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './db/data-source'
import authRouter from './router/auth.router'
import postRouter from './router/post.routes'
import { authMiddleware } from './middleware/middleware'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/post', authMiddleware, postRouter)



AppDataSource.initialize().then(() => {
    app.listen(5000, () => {
        console.log("server running 5000");

    })
})

