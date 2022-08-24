import express, { Express } from 'express';
import cors from 'cors';

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
    this.app.use(cors());
  }

  routes() {
    this.app.use('/api', router);
  }
}

export default new Server().app;
