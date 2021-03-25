import petRouter from './api/controllers/pets/pets.router';
import userRouter from './api/controllers/users/users.router';
import authRouter from './api/auth/auth.router';
import imagesRouter from './api/controllers/images/images.router';

export default function routes(app) {
  app.use('/api/v1/pets', petRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/images', imagesRouter);
}
