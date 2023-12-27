import { MongoDBService } from '@feathersjs/mongodb'

export class PasswordService extends MongoDBService {}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate') || false,
    Model: app.get('mongodbClient').then((db) => db.collection('passwords'))
  }
}