import { Request, Response } from 'express';
import SendForgotPasswordEmailServices from '../services/SendForgotPasswordEmailServices';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailServices =
      new SendForgotPasswordEmailServices();

    await sendForgotPasswordEmailServices.execute({
      email,
    });

    return response.status(204).json();
  }
}
