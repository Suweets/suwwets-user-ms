import user from './controller/userController.js';

export default function routes(app) {
  app.use(user);
}