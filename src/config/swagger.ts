import swaggerJSDoc from 'swagger-jsdoc'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Lista de directorios que contienen archivos YAML
const directories = [
  'user',
  'auth'
]

// Crear una lista de rutas de archivos YAML
const apis = directories.map(dir =>
  join(__dirname, `../modules/${dir}/infrastructure/swagger.yml`)
)

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
  apis
}

/**
 * Swagger specification. This is used to generate the API documentation for the app.
 */
export const swaggerSpec = swaggerJSDoc(options)