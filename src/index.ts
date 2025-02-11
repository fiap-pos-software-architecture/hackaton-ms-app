import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import express from 'express';
import * as logger from 'morgan';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../dist/swagger.json';
import { AppDataSource } from './data-source';
import authRoute from './adapters/driver/api/routers/authRoute';
import fileRoute from './adapters/driver/api/routers/fileRoute';
import videoRoute from './adapters/driver/api/routers/videoRoute';

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(cors.default());
    app.use(bodyParser.json());
    app.use(logger.default('dev'));
    app.use(express.json(), authRoute, fileRoute, videoRoute);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(process.env.APP_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.APP_PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error));
