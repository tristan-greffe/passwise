const serverPort = process.env.PORT || 8081
const clientPort = process.env.CLIENT_PORT || 8080

let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://passwise.dev.tristan-greffe.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://passwise.test.tristan-greffe.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://passwise.tristan-greffe.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort
  } else {
    domain = 'http://localhost:' + serverPort
  }
}


let origin
process.env.NODE_ENV === 'development' ? origin = 'http://localhost:' + serverPort : origin = domain

export default {
  domain,
  origin,
  apiPath: '/api',
  apiJwt: 'passwise-jwt',
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  storage: {
    useProxy: true
  }
}
