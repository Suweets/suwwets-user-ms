import user from './controller/userController.js';
import login from './controller/loginController.js';

export default function routes(app) {
  app.use(user);
  app.use(login);
}