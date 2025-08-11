import { createApp } from './app.mjs'
import { createAuth } from './auth.mjs'
import { config } from './config.mjs'
import { logger } from './logger.mjs'

createAuth()
  .then((auth) => createApp(auth))
  .then((app) => app.listen(config.port, () => logger.info(`Listening on port ${config.port}`)))
  .catch((err: unknown) => {
    logger.error(err)
    process.exit(1)
  })
