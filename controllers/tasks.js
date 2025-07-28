import moment from 'moment'
import Task from '../models/Task.js'
import { MESSAGES, PRIORITIES } from '../utils/constants.js'

// get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user }).sort({ dueDate: 1 })
        res.json({
            data: { tasks },
            statusCode: 200,
        })
    } catch (err) {
        console.error('error in GET /tasks:', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}

// get one task
export const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user })
        if (!task)
            return res.status(404).json({
                message: MESSAGES.NOT_FOUND,
                statusCode: 404,
            })
        res.json({ data: { task }, statusCode: 200 })
    } catch (err) {
        console.error('error in GET /tasks/:id:', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}

// save a task
export const saveTask = async (req, res) => {
    const { title, description = '', dueDate, priority } = req.body

    // validate user input
    if (!title)
        return res.status(400).json({
            message: MESSAGES.INVALID_TITLE,
            statusCode: 400,
        })
    if (
        !dueDate ||
        !moment(dueDate, moment.ISO_8601, true).isValid() ||
        !moment(dueDate).isAfter(moment())
    )
        return res.status(400).json({
            message: MESSAGES.INVALID_DUEDATE,
            statusCode: 400,
        })
    if (!PRIORITIES.includes(priority))
        return res.status(400).json({
            message: MESSAGES.INVALID_PRIORITY,
            statusCode: 400,
        })

    // save task
    try {
        const task = await Task.create({
            user: req.user,
            title,
            description,
            dueDate,
            priority,
        })
        res.status(201).json({ data: { task }, statusCode: 201 })
    } catch (err) {
        console.error('error in POST /tasks:', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}

// update a task
export const updateTask = async (req, res) => {
    const { title, dueDate, priority } = req.body

    // validate user input
    if (!title)
        return res.status(400).json({
            message: MESSAGES.INVALID_TITLE,
            statusCode: 400,
        })
    if (
        !dueDate ||
        !moment(dueDate, moment.ISO_8601, true).isValid() ||
        !moment(dueDate).isAfter(moment())
    )
        return res.status(400).json({
            message: MESSAGES.INVALID_DUEDATE,
            statusCode: 400,
        })
    if (!PRIORITIES.includes(priority))
        return res.status(400).json({
            message: MESSAGES.INVALID_PRIORITY,
            statusCode: 400,
        })

    // update task
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true }
        )
        if (!task)
            return res.status(404).json({
                message: MESSAGES.NOT_FOUND,
                statusCode: 404,
            })
        res.json({ data: { task }, statusCode: 200 })
    } catch (err) {
        console.error('error in PUT /tasks/:id:', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}

// delete a task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user,
        })
        if (!task)
            return res.status(404).json({
                message: MESSAGES.NOT_FOUND,
                statusCode: 404,
            })
        res.sendStatus(204)
    } catch (err) {
        console.error('error in DELETE /tasks/:id:', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}
