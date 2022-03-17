import { Request, Response } from 'express';
import CreateUserServices from '../services/CreateUserServices';
import ListUserServices from '../services/ListUserServices';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserServices();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
