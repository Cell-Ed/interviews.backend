import * as express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export default express
  .Router()
  .post(
    '/register',
    passport.authenticate('register', { session: false }),
    async (req, res) => {
      res.json({
        message: 'Signup successful',
        user: req.user,
      });
    }
  )
  .post('/token', async (req, res, next) => {
    passport.authenticate('login', async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('Email or password is incorrect.');
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, 'TOP_SECRET');
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
