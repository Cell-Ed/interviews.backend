import * as express from 'express';
import petsController from './pets.controller';
import passport from 'passport';

export default express
  .Router()
  .get('/', petsController.all)
  .get('/:id', petsController.byId)
  .patch(
    '/:id/archive',
    passport.authenticate('jwt', { session: false }),
    petsController.archive
  )
  .patch(
    '/:id/unarchive',
    passport.authenticate('jwt', { session: false }),
    petsController.unarchive
  )
  .post(
    '/',
    passport.authenticate('jwt', { session: false }),
    petsController.create
  )
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    petsController.update
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    petsController.delete
  );
