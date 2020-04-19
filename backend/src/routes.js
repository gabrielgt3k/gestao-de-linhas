import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import LinhaController from './app/controllers/LinhaController';
import LinhasVivoController from './app/controllers/LinhasVivoController';
import LinhasOiController from './app/controllers/LinhasOiController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/linhas', LinhaController.store);
routes.get('/linhas', LinhaController.index);
routes.put('/linhas/:id', LinhaController.update);
routes.delete('/linhas/:id', LinhaController.delete);

routes.get('/linhas/vivo', LinhasVivoController.index);
routes.get('/linhas/oi', LinhasOiController.index);

export default routes;
