export const PRIORITIES = ['high', 'medium', 'low']

export const NO_AUTH_PATHS = [
    { path: '/api/register', methods: ['POST'] },
    { path: '/api/login', methods: ['POST'] },
]

export const MESSAGES = {
    DUPLICATE_EMAIL: 'User already exists!',
    BAD_REQUEST: 'Bad request!',
    INVALID_CREDENTIALS: 'Invalid credentials!',
    SOMETHING_WENT_WRONG: 'Something went wrong!',
    NOT_FOUND: 'Not found!',
    ACCESS_DENIED: 'Access denied!',
    INVALID_TOKEN: 'Invalid token!',
    INVALID_TITLE: 'Title is required.',
    INVALID_DUEDATE: 'Due date must be a valid upcoming date-time string.',
    INVALID_PRIORITY: 'Priority must be one of: high, medium, or low.',
}
