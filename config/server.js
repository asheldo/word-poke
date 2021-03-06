'use strict'

const states = ({off:"server-off", on:"server-on"})

module.exports = {
  name: 'WordPoke',
  version: '1.0.0',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  serverStates: Object.freeze(states),
  serverState: ({state: states.off, server: null})
}
