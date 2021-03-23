import * as express from 'express';
import usersController from './users.controller';

export default express
  .Router()
  .post('/', usersController.create)
  .get('/', usersController.all)
  .get('/:id', usersController.byId)
  .delete('/:id', usersController.delete);
