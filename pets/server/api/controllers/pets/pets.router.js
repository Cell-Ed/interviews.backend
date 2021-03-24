import * as express from 'express';
import petsController from './pets.controller';

export default express
  .Router()
  .post('/', petsController.create)
  .get('/', petsController.all)
  .get('/:id', petsController.byId)
  .get('/:id/archive', petsController.archive)
  .delete('/:id', petsController.delete);
