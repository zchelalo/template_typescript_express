import swaggerJSDoc from 'swagger-jsdoc'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for the App',
      version: '1.0.0',
      description: 'This is the API documentation for the app',
    },
    schemes: ['http'],
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
        description: 'Development server'
      }
    ]
  },
  apis: [
    join(dirname(fileURLToPath(import.meta.url)), '../modules/*/infrastructure/router.ts')
  ]
}

export const swaggerSpec = swaggerJSDoc(options)