import { Request, Response } from 'express';
import CreateSessionsServices from '../services/CreateSessionaServices';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsServices();

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
