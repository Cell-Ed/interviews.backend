import petRouter from './api/controllers/pets/pets.router';
import userRouter from './api/controllers/users/users.router';
import authRouter from './api/auth/auth.router';

export default function routes(app) {
  app.use('/api/v1/pets', petRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/auth', authRouter);
}
