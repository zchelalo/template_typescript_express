# Template Typescript & Express
Existen muchas maneras de crear una REST API en NodeJS, siempre a la hora de comenzar un nuevo proyecto pienso en el cómo lo voy a hacer, ya sea las herramientas a utilizar, la arquitectura a usar, entre otras cosas. En este template junto las mejores herramientas posibles (criterio personal) sumado al uso de buenas practicas, para lograr hacer un proyecto mantenible y escalable.

### Tabla de contenido
- [¿Qué es la arquitectura hexagonal?](#qué-es-la-arquitectura-hexagonal)
  - [¿Por qué usarla?](#por-qué-usarla)
- [Herramientas utilizadas](#herramientas-utilizadas)
- [¿Cómo ejecutar el proyecto?](#cómo-ejecutar-el-proyecto)
  - [Requisitos previos](#requisitos-previos)
  - [Variables de entorno](#variables-de-entorno)
  - [Ejecución de docker](#ejecución-de-docker)
  - [Migraciones](#migraciones)
  - [Testing](#testing)
  - [Documentación](#documentación)
- [Contribuciones](#contribuciones)

## ¿Qué es la arquitectura hexagonal?
Como su nombre lo dice, es una arquitectura la cual se divide en hexagonos, más concretamente son tres. Se presenta un esquema para que sea más fácil su entendimiento:

![Hexagonal Architecture](./assets/images/hexagonal_architecture.png)

- Domain. Es el nucleo del hexágono, contiene toda la lógica de negocio pura. Es donde se definen las entidades, objetos de valor, agregados e interfaces de repositorios. Esta capa solo puede hablar con si misma, no tiene dependencia de ninguna otra capa.
- Application. Son los casos de uso, es el intermediario o quien coordina las operaciones entre el dominio y la infraestructura. Aquí se aplican las reglas del negocio en respuesta a que suceda. Esta capa solo puede comunicarse con si misma y con el dominio.
- Infrastructure. Implementa las interfaces definidas en las anteriores capas, aquí se encuentran los adaptadores que interactúan con la base de datos o cualquier otro servicio externo. Es quien gestiona la implementación de repositorios, configuraciones u otros aspectos operativos.

El objetivo de utilizar esta arquitectura es el separar responsabilidades, al hacerlo si a futuro es necesario cambiar algo puede hacerse sin tener que rehacer gran parte de la aplicación.

### ¿Por qué usarla?
Ofrece orden, consistencia y claridad en el código, además de tener gran mantenibilidad y escalabilidad del proyecto. Al separar las responsabilidades si en algún momento se cambia de framework de desarrollo, de base de datos o cualquier otra cosa, solo se necesita cambiar esa parte del módulo. Sumado a eso, el que las diferentes secciones del proyecto sean independientes ayuda a hacer testing a la aplicación.

## Herramientas utilizadas
- [Typescript](https://www.typescriptlang.org/docs/). Brinda una capa de seguridad y de velocidad al momento de desarrollar al agregar tipos a Javascript, se termina haciendo más cómodo.
- [Express](https://expressjs.com). Un framework sencillo, útil y probablemente el más conocido entre los desarrolladores en NodeJS.
- [Zod](https://zod.dev). Zod es una librería muy completa para la validación de datos, además esta escrita en Typescript por lo que tiene tipos por defecto.
- [Drizzle](https://orm.drizzle.team/docs/overview). Drizzle mismo lo dice, si sabes SQL sabes Drizzle, es muy cómodo de usar, ofrece un CLI y además es rápido.
- [Winston](https://www.npmjs.com/package/winston). Es muy útil flexible, personalizable, tiene fácil integración con otras herramientas, etcetéra.
- [Jest](https://jestjs.io/docs/getting-started). Es casi indispensable utilizar Jest para hacer testing unitario en tu aplicación, es sencillo de usar, robusto y personalizable.
- [Supertest](https://www.npmjs.com/package/supertest). Herramienta muy sencilla y funcional para probar una API, además es muy usada con Express.
- [Typedoc](https://typedoc.org/guides/installation/). Si conoces o haz usado JSDoc te será muy fácil usar Typedoc, además de que hace la mayor parte de la documentación basandose en los tipos de Typescript.
- [Swagger](https://www.npmjs.com/package/swagger-jsdoc). Algunos frameworks lo integran por defecto, es sencillo de usar y para documentar y probar una API es de lo mejor que se puede usar. Además de ser de mucha ayuda para los desarrolladores del lado del cliente.
- [Bruno](https://www.usebruno.com/downloads). Un REST client es esencial a la hora de desarrollar proyectos como este, a pesar de ya poder probar los endpoints con Swagger sigo usando un REST client por algunas de las herramientas que ofrece como el runner, además todos los endpoints se suben a GitHub hacilitando el trabajo en equipo y sin tener ningún costo.

## ¿Cómo ejecutar el proyecto?
### Requisitos previos
- [Docker](https://docs.docker.com/install/)
- [Docker compose](https://docs.docker.com/compose/install/)
- [NodeJS](https://nodejs.org/en/download/package-manager)

*Nota: Hay que tener en cuenta que todo el proyecto fue probado en WSL*

### Variables de entorno
Para configurar las variables de entorno dentro del proyecto existe un script dentro del package.json el cual es `npm run create:envs` a la hora de ejecutarlo lo que hará es copiar el archivo ".env.example" a un archivo ".env". En caso de querer cambiar algo ya es cosa de modificar el ahora existente archivo ".env".

### Ejecución de docker
Habiendo configurado anteriormente las variables de entorno es hora de ejecutar los contenedores de docker, dentro de la carpeta ".dockers" están los archivos necesarios para ello. Se ejecuta el script de package.json `npm run compose`, este ejecutará el archivo ".dockers/docker-compose.yml" y se empezará a hacer el build del proyecto. En caso de ser necesario también existe un comando `npm run compose:build` el cual hace explicitamente un build del proyecto.

### Migraciones
Antes que nada, para que funcionen las migraciones tiene que estar ejecutandose el "docker compose" ya que la base de datos tiene que estar activa.

Las migraciones son hechas con Drizzle, primero se generan los archivos ".sql" y la metadata de las migraciones al hacer un `npm run migration:generate`. Estos schemas SQL se hacen en base a los modelos creados con Drizzle, desde las tablas, la estructura de estas, sus relaciones, indices, todo se hace en automático.

Una vez con las migraciones generadas se tiene que hacer el push con `npm run migration:push`. De esta forma se aplicarán las migraciones antes generadas.

En ocasiones es un poco tedioso el andar ejecutando estos dos comandos por separado, de forma que existe un comando el cual crea las migraciones y después hace el push en uno solo, este comando es `npm run migrate`.

### Testing
Una vez todo el proyecto esta en ejecución es hora de ejecutar los test. Estos se ubican en la carpeta "test" y dentro de esta se replica la ruta del archivo testeado, la única diferencia es que lleva un ".test" después del nombre. Dentro del package.json se encuentra el script a ejecutar, en este caso es `npm run test`. Primero pone la variable de entorno "NODE_ENV" con el valor de "test", de esta manera al cargar las variables de entorno en el proyecto se carga el archivo ".env.test", así que si se quiere manejar un valor diferente en las variables de entorno durante los test, se puede hacer.

Al ejecutar los test se creará una carpeta "coverage" en la raíz del proyecto, dentro de esta se encuentran dos reportes respecto a los test, el primero es un reporte sobre los test ejecutados llamado "test-report.html", el cual tiene información sobre si las pruebas pasaron o si resultaron en error. El segundo archivo creado es uno llamado "index.html", este tiene toda la información acerca de cuantas lineas de código están testeadas, puedes navegar entre el código para ver que lineas hacen falta por probar, de esa manera hacer test más completos.

### Documentación
La documentación en un proyecto es fundamental para que un proyecto sea mantenible y escalable, en este proyecto se utilizaron dos herramientas para este fin.

#### Typedoc
Fue usado para documentar el código, explicar que sentido tienen las funciones, variables, enums, clases, interfaces, etcetéra. Para ver la documentación del proyecto se ejecuta un script del package.json, el cual es `npm run create:docs`, esto creará una carpeta en la raíz del proyecto llamada "docs", dentro de ella se encuentra el "index.html", el archivo que tendremos que abrir para ver toda la documentación generada.

#### Swagger
Se utilizó para documentar la REST API, parámetros que acepta, el cuerpo que debe tener la petición, las respuestas de éxito o de error del endpoint, entre otras cosas. Para acceder a la documentación de Swagger de debe acceder a la url de "docs", de forma que si se dejan los parametros del template por defecto sería "http://localhost:8000/docs". Se pueden ver todos los endpoints agrupados por su respectivo "tag", además se puede especificar un schema de seguridad ya sea para el envío de JWT tokens, o algún otro método de seguridad.

### REST client
Los endpoints de Bruno estan en la carpeta "endpoints", lo único necesario para utilizarlos es abrir esa carpeta con la aplicación de Bruno. Una vez hecho esto solo se carga el environment necesario y se prueba cada endpoint, o a su vez se puede ejecutar el runner para probar si todo funciona correctamente.

## Contribuciones
El proyecto esta abierto a contribuciones, si quieres apoyar con algo eres completamente libre de hacer una pull request, de hecho estaría encantado de recibirla.