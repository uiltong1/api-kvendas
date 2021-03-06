import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailServices {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 400);
    }

    const token = await userTokenRepository.generate(user.id);
  }
}

export default SendForgotPasswordEmailServices;
