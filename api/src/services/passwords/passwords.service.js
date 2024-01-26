import { PasswordService, getOptions } from './passwords.mongodb.js'
import passwordHooks from './passwords.hooks.js'

export const password = (app) => {
  const passwordPath = `${app.get('apiPath')}/passwords`

  app.use(passwordPath, new PasswordService(getOptions(app)), {
    methods: ['find', 'create', 'patch', 'remove'],
    events: []
  })

  app.service(passwordPath).hooks(passwordHooks)
}
