import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import path from 'path'
import authenticate from './middlewares/authenticate.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'
import { fileURLToPath } from 'url'

dotenv.config()

// Express App
const app = express()
app.use(express.json())

// setup Mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected!'))
    .catch((err) => console.error('DB error:', err))

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// serve static files from public
app.use(express.static(path.join(__dirname, 'public')))
// base route
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// use middleware to authenticate api requests
app.use(authenticate)

// api routes
app.use('/api', routes)

// setup server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server now running on port ${PORT}`))
