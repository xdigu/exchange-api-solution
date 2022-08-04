import express, { Express } from 'express';

import router from './routes';

class Server {
  app: Express;
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', router);
  }
}

export default new Server().app;
