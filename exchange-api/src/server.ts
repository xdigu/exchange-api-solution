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
    this.app.use((req, res, next) => {
      console.log('new request');
      next();
    });
  }

  routes() {
    this.app.use(router);
  }
}

export default new Server().app;
