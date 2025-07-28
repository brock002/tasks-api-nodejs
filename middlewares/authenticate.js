import jwt from 'jsonwebtoken'
import { MESSAGES, NO_AUTH_PATHS } from '../utils/constants.js'

const authenticate = (req, res, next) => {
    // check if current path required the Authorization header
    const isNoAuthNeeded = NO_AUTH_PATHS.find(
        (item) => item.path === req.path
    )?.methods.includes(req.method)

    // if Authorization not needed then forward directly
    if (isNoAuthNeeded) {
        next()
        return
    }

    // extract token
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token)
        return res
            .status(401)
            .json({ message: MESSAGES.ACCESS_DENIED, statusCode: 401 })

    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // attach decoded user to request
        req.user = decoded.id
        next()
    } catch (err) {
        res.status(401).json({
            message: MESSAGES.INVALID_TOKEN,
            statusCode: 401,
        })
    }
}

export default authenticate
