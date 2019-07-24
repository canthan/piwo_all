import { getLogger } from 'log4js';

import tokens, { TokenModel } from './../models/token.model';
import Exceptions from '../common/exceptions/exceptions';
import { generateJwt, generateRefresh } from './token.utils';

const logger = getLogger();


export class TokenService {

  public static async createToken(userId: string): Promise<[string, string]> {
    logger.info(`Registering token for ${userId}`);

    await tokens.deleteOne({ userId }).exec();

    const token = generateJwt(userId);
    const refreshToken = generateRefresh();

    const newTokenModel = await tokens.create({ userId, token: refreshToken })

    return newTokenModel.save()
      .then((response: TokenModel) => {
        const savedToken: TokenModel = response.toObject();

        return [token, savedToken.token];
      });
  }

  public static async getTokenByUserId(userId: string): Promise<string> {
    const foundToken = await tokens.findOne({ userId }).exec();

    if (!foundToken) {
      throw new Exceptions.NotFoundException(`Token cannot be found`);
    }

    return foundToken.token;
  }

  public static async getToken(token: string): Promise<string> {

    const foundToken = await tokens.findOne({ token }).exec();

    if (!foundToken) {
      throw new Exceptions.NotFoundException(`Token cannot be found`);
    }

    return foundToken.token;
  }

  public static async removeToken(token: string): Promise<void> {
    const foundToken = await tokens.remove({ token }).exec();

    if (!foundToken) {
      throw new Exceptions.NotFoundException(`Token cannot be found`);
    }
  }

}