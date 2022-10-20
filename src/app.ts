import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import logger from './logger';
import ApplicationError from './errors/application-error';

function logResponseTime(req: Request, res: Response, next: NextFunction) {
    const startHrTime = process.hrtime();
  
    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
      logger.log({
        level: 'debug',
        message,
        consoleLoggerOptions: { label: 'API' }
      });
    });
  
    next();
}

class App {
  public server;

  constructor() {
    this.server = express();
    
    this.config();
    this.middlewares();
    this.routes();
  }

  config() {
    // Setup app configurations
    // this.server.use(compression()); // TODO: what is this?
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(logResponseTime)
  }

  middlewares() {
    this.server.use(express.json());
    logger.info(`This project is powered by express`);
    this.error()
  }

  error() {
    this.server.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
      logger.error(err)
      if (res.headersSent) {
            return next(err);
        }

        return res.status(err.status || 500).json({
        error: err.message
        });
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;