import { app } from './server'
import './config'
import { logger } from './helpers/logger'

app.listen(process.env.PORT, () => logger.info(`Server is running on port ${process.env.PORT}`))