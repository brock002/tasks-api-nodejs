import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import authenticate from './middlewares/authenticate.js'

dotenv.config()

// Express App
const app = express()
app.use(express.json())

// setup Mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected!'))
    .catch((err) => console.error('DB error:', err))

// use middleware to authenticate requests
app.use(authenticate)

// setup routes
app.use('/', routes)

// setup server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server now running on port ${PORT}`))
