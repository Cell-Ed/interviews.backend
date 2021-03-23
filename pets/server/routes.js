import petRouter from './api/controllers/pets/router';

export default function routes(app) {
  app.use('/api/v1/pets', petRouter);
}
