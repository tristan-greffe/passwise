import { CategoryService, getOptions } from './categories.mongodb.js'
import categoryHooks from './categories.hooks.js'

export const category = (app) => {
  const categoryPath = `${app.get('apiPath')}/categories`

  app.use(categoryPath, new CategoryService(getOptions(app)), {
    methods: ['find', 'create', 'patch', 'remove'],
    events: []
  })
  
  app.service(categoryPath).hooks(categoryHooks)
}