import mongoose from 'mongoose'
import { PRIORITIES } from '../utils/constants.js'

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: Date },
        priority: {
            type: String,
            enum: PRIORITIES,
            default: 'medium',
        },
    },
    { timestamps: true }
)

export default mongoose.model('Task', taskSchema)
