import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
// import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

// app.use(cors);
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        title: 'Error',
        message: error.message,
        statusCode: error.statusCode,
      });
    }

    return response.status(500).json({
      title: 'Error',
      message: 'Internal error server',
      statusCode: 500,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on Port 3333');
});
