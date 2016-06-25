import log from './log'

// default environment to `development`
const env = process.env.NODE_ENV || 'development'

log.info(`Using ${env} environment...`)

let configs = {}

if (env === 'development') {
  configs = {
    env: 'development',
    port: 4567
  }
} else if (env === 'production') {
  configs = {
    env: 'production',
    port: process.env.PORT
  }
}

export default configs
