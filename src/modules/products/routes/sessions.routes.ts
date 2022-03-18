import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '@modules/users/controllers/SessionsController';

const sessionsRouter = Router();
const sessionsCOntroller = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsCOntroller.create,
);

export default sessionsRouter;
