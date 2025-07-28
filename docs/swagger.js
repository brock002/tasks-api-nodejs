import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:5000/api' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
