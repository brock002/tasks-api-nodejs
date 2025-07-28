import { Router } from 'express'
import authRouter from './auth.js'
import tasksRouter from './tasks.js'

const router = Router()

// routes for Auth
router.use('/', authRouter)
// routes for Tasks
router.use('/tasks', tasksRouter)

export default router
