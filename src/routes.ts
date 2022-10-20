import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json'
import * as PostController from './controllers/post'
import * as UserController from './controllers/user'
import * as ReactionController from './controllers/reaction'
import * as NotificationController from './controllers/notification'

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

routes.get('/users', UserController.all);
routes.post('/users', UserController.add);

routes.get('/users/:userId/notifs', NotificationController.aggregate )
// routes.post('/users/:userId/notifs', NotificationController.add )

routes.get('/users/:userId/posts', PostController.all);
routes.post('/users/:userId/posts', PostController.add);
routes.put('/users/:userId/posts/:postId', PostController.update);

routes.get('/posts/:postId/reactions', ReactionController.all);
routes.post('/posts/:postId/reactions', ReactionController.add);

routes.use('/dev/api-docs', swaggerUi.serve);
routes.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));

export default routes;