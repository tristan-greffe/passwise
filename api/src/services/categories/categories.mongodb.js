import { MongoDBService } from '@feathersjs/mongodb'

export class CategoryService extends MongoDBService {}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate') || false,
    Model: app.get('mongodbClient').then((db) => db.collection('categories'))
  }
}