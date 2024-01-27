const path = require('path')
const fs = require('fs')
//const containerized = require('containerized')()

const serverPort = process.env.PORT || 8081
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'

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

module.exports = {
  origins: [domain],
  apiPath: API_PREFIX,
  paginate: { default: 10, max: 50 },
  //mongodb: containerized ? 'mongodb://mongodb:27017/passwise' : 'mongodb://127.0.0.1:27017/passwise',
  ongodb: 'mongodb://mongodb:27017/passwise',
  host: process.env.HOSTNAME || 'localhost',
  port: serverPort,
  bodyParser: {
    json: { limit: 10 * 1024 * 1024 } // 10MB
  },
  distPath: path.join(__dirname, '../../dist'),
  passwordPolicy: {
    minLength: 8,
    maxLength: 128,
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: true,
    prohibited: fs.readFileSync(path.join(__dirname, '10k_most_common_passwords.txt')).toString().split('\n')
  },
  mailer: {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASWORD
    },
    templateDir: path.join(__dirname, 'email-templates')
  },
  proxyTable: {},
  domain,
  public: './public',
  authentication: {
    secret: process.env.APP_SECRET || 'my secret',
    service: API_PREFIX + '/users',
    path: API_PREFIX + '/authentication',
    entity: 'user',
    authStrategies: [
      'jwt',
      'local',
      'google'
    ],
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
    jwtOptions: {
      header: {
        typ: 'access' // See https://tools.ietf.org/html/rfc7519#section-5.1
      },
      audience: domain,
      algorithm: 'HS256', // See https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
      expiresIn: '1d'
    },
    oauth: {
      google: {
        key: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
      }
    }
  }
}
