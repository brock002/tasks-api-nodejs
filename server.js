import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import authenticate from './middlewares/authenticate.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'

dotenv.config()

// Express App
const app = express()
app.use(express.json())

// setup Mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected!'))
    .catch((err) => console.error('DB error:', err))

// base route
app.get('/', express.static('public'))
// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// use middleware to authenticate api requests
app.use(authenticate)

// api routes
app.use('/api', routes)

// setup server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server now running on port ${PORT}`))
