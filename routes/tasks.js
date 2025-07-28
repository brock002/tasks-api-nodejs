import express from 'express'
import * as taskController from '../controllers/tasks.js'

const router = express.Router()

// save task
router.post('/', taskController.saveTask)

// get tasks
router.get('/', taskController.getTasks)

// get a task
router.get('/:id', taskController.getTask)

// update a task
router.put('/:id', taskController.updateTask)

// delete a task
router.delete('/:id', taskController.deleteTask)

export default router
