import express from 'express'
import * as authController from '../controllers/auth.js'

const router = express.Router()

// Register
router.post('/register', authController.register)

// Login
router.post('/login', authController.login)

export default router
