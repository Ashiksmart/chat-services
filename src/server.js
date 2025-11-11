import express from 'express'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import connect from './config/db.js'
import dotenv from 'dotenv'


dotenv.config()
connect()

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.get("/healthcheck", (req, res) => {
    res.json({ message: "Healthcheck working...." })
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
})