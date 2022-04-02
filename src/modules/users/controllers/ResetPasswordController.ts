import { Request, Response } from 'express';
import ResetPasswordServices from '../services/ResetPasswordServices';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordServices = new ResetPasswordServices();

    await resetPasswordServices.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
