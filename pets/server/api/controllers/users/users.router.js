import * as express from 'express';
import usersController from './users.controller';
import passport from 'passport';

export default express
  .Router()
  .get(
    '/',
    passport.authenticate('jwt', { session: false }),
    usersController.all
  )
  .get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    usersController.byId
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    usersController.delete
  );
