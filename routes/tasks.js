/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management routes
 */
import express from 'express'
import * as taskController from '../controllers/tasks.js'

const router = express.Router()

// save task
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, dueDate, priority]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 enum: [high, medium, low]
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', taskController.saveTask)

// get tasks
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user tasks
 */
router.get('/', taskController.getTasks)

// get a task
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */

router.get('/:id', taskController.getTask)

// update a task
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 enum: [high, medium, low]
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
router.put('/:id', taskController.updateTask)

// delete a task
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', taskController.deleteTask)

export default router
