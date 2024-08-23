# Template Typescript & Express
Existen muchas maneras de crear una REST API en NodeJS, siempre a la hora de comenzar un nuevo proyecto pienso en el cómo lo voy a hacer, ya sea las herramientas a utilizar, la arquitectura a usar, entre otras cosas. En este template junto las mejores herramientas posibles (criterio personal) sumado al uso de buenas practicas, para lograr hacer un proyecto mantenible y escalable.

### Tabla de contenido
- [¿Qué es la arquitectura hexagonal?](#qué-es-la-arquitectura-hexagonal)
  - [Componentes](#componentes)
  - [¿Por qué usarla?](#por-qué-usarla)
- [Herramientas utilizadas](#herramientas-utilizadas)
- [¿Cómo ejecutar el proyecto?](#cómo-ejecutar-el-proyecto)
  - [Requisitos previos](#requisitos-previos)
  - [Variables de entorno](#variables-de-entorno)
  - [Migraciones](#migraciones)
  - [Testing](#testing)
  - [Documentación](#documentación)
- [Contribuciones](#contribuciones)

## ¿Qué es la arquitectura hexagonal?

### Componentes

### ¿Por qué usarla?

## Herramientas utilizadas
- [Typescript](https://www.typescriptlang.org/docs/). 
- [Express](https://expressjs.com).
- [Zod](https://zod.dev).
- [Drizzle](https://orm.drizzle.team/docs/overview).
- [Winston](https://www.npmjs.com/package/winston).
- [Jest](https://jestjs.io/docs/getting-started).
- [Supertest](https://www.npmjs.com/package/supertest).
- [Typedoc](https://typedoc.org/guides/installation/).
- [Swagger](https://www.npmjs.com/package/swagger-jsdoc).

## ¿Cómo ejecutar el proyecto?
### Requisitos previos
- [Docker](https://docs.docker.com/install/)
- [Docker compose](https://docs.docker.com/compose/install/)
- [NodeJS](https://nodejs.org/en/download/package-manager)

*Nota: Hay que tener en cuenta que todo el proyecto fue probado en WSL*

### Variables de entorno
Para configurar las variables de entorno dentro del proyecto existe un script dentro del package.json el cual es `npm run create:envs` a la hora de ejecutarlo lo que hará es copiar el archivo ".env.example" a un archivo ".env". En caso de querer cambiar algo ya es cosa de modificar el ahora existente archivo ".env".

### Migraciones
Antes que nada, para que funcionen las migraciones tiene que estar ejecutandose el "docker compose" ya que la base de datos tiene que estar activa.
Las migraciones son hechas con Drizzle, primero se generan los archivos ".sql" y la metadata de las migraciones al hacer un `npm run migration:generate`. Estos schemas SQL se hacen en base a los modelos creados con Drizzle, desde las tablas, la estructura de estas, sus relaciones, indices, todo se hace en automático.
Una vez con las migraciones generadas se tiene que hacer el push con `npm run migration:push`. De esta forma se aplicarán las migraciones antes generadas.
En ocasiones es un poco tedioso el andar ejecutando estos dos comandos por separado, de forma que existe un comando el cual crea las migraciones y después hace el push en uno solo, este comando es `npm run migrate`.

### Ejecución

### Testing

### Documentación

## Contribuciones