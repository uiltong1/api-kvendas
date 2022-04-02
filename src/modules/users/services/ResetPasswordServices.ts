import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repositories/UserRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordServices {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userTokenRepository = getCustomRepository(UserTokenRepository);
    const userRepository = getCustomRepository(UserRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
