import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import moment from 'moment'
import { MESSAGES } from '../utils/constants.js'

// register a user
export const register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existing = await User.findOne({ email })
        if (existing)
            return res
                .status(400)
                .json({ message: MESSAGES.DUPLICATE_EMAIL, statusCode: 400 })

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password: hashedPassword,
        })

        res.status(201).json({
            message: 'User registered successfully.',
            statusCode: 201,
        })
    } catch (err) {
        console.error('error in register', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}

// login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // check if user exists with the current email
        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({
                message: MESSAGES.INVALID_CREDENTIALS,
                statusCode: 400,
            })

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({
                message: MESSAGES.INVALID_CREDENTIALS,
                statusCode: 400,
            })

        // generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        // send token in response
        res.json({
            token,
            expiresIn: moment().add(1, 'd'),
        })
    } catch (err) {
        console.error('error in login', err)
        res.status(500).json({
            message: MESSAGES.SOMETHING_WENT_WRONG,
            statusCode: 500,
        })
    }
}
