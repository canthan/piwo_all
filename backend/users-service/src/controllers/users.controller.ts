import { Context } from 'koa';
import { getLogger } from 'log4js';
import * as bcrypt from 'bcryptjs';

import { NotFoundException } from '../common/exceptions/not-found.exception';
import { UnauthorizedException } from '../common/exceptions/unauthorized.exception';
import config, { AppConfig } from '../common/utils/config.loader';
import { asyncForEach } from '../common/utils/async.foreach';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';

import { TokenService } from './../services/token.service';
import { UsersService } from './../services/user.service';
import { StashesService } from '../services/stashes.service';
import { removePassword, mapUserOutDTO } from '../services/mapper.service';
import { generateJwt } from '../services/token.utils';

import { AnyFunction } from '../types/types';
import { StashConfigDeleted } from './../types/types';
import { ErrorText } from '../constants/messeges';

const logger = getLogger();

export class UsersController {
  private stashesService: StashesService = new StashesService();

  public getUserById = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const id = ctx.params.userId;
      const user = await UsersService.getUserById(id);
      logger.info(`Got ${user.username} user`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: user,
      };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public login = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const email = ctx.request.body.email;
      const password = ctx.request.body.password;

      const user = await UsersService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException(ErrorText.USER_DOES_NOT_EXIST);
      }

      if (user && await bcrypt.compare(password, user.password)) {

        const refreshToken = await TokenService.getTokenByUserId(user.userId);
        const token = generateJwt(user.id);

        // to be changed to handle tokens correctly
        ctx.body = {
          status: HTTP_STATUS.OK,
          data: {
            ...removePassword(mapUserOutDTO(user)),
            refreshToken,
            token,
          },
        };
      } else {
        throw new UnauthorizedException(ErrorText.WRONG_PASSWORD);
      }
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public editProfile = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const { userId, email, firstname, surname } = ctx.request.body.user;

      const user = await UsersService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(ErrorText.USER_DOES_NOT_EXIST);
      }

      const editedUser = await UsersService.editUser({
        ...user,
        userId,
        email,
        firstname,
        surname,
      });

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: {
          ...removePassword(editedUser),
        },
      }
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public updateStashConfig = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const { userId } = ctx.params;
      const { stashConfig }: { stashConfig: StashConfigDeleted[] } = ctx.request.body;

      const user = await UsersService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(ErrorText.USER_DOES_NOT_EXIST);
      }

      const removedStashes = stashConfig.filter(stash => stash.deleted);
      let deletedStashes = 0;
      const deletedStashNames: string[] = [];

      await asyncForEach(removedStashes, async (stash: StashConfigDeleted) => {
        deletedStashes += +(await this.stashesService.removeStashesByName(stash.name));
        deletedStashNames.push(stash.name);
      });

      const editedUser = await UsersService.updateStashConfig(userId, stashConfig.filter(stash => !stash.deleted));

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: {
          deletedStashes,
          deletedStashNames,
          stashConfig: editedUser.stashConfig,
        },
      }
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public logout = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const email = ctx.request.body.email;

      const user = await UsersService.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException(ErrorText.USER_DOES_NOT_EXIST);
      }

      // to add token management
      ctx.body = {
        status: HTTP_STATUS.OK,
        data: {},
      }

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public register = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const email = ctx.request.body.email;
      const password = ctx.request.body.password;

      const user = await UsersService.getUserByEmail(email);
      if (user) {
        throw new NotFoundException(ErrorText.USER_EXIST);
      }

      const hashedPassword = await bcrypt.hash(password, config.get(AppConfig.BCRYPT_ROUNDS));
      const registeredUser = await UsersService.registerUser(email, hashedPassword);
      const tokens: [string, string] = await TokenService.createToken(registeredUser.userId);

      // to be changed to handle tokens correctly
      ctx.body = {
        status: HTTP_STATUS.OK,
        data: {
          token: tokens[0],
          refreshToken: tokens[1],
          email: registeredUser.email,
          userId: registeredUser.userId,
          registrationDate: registeredUser.registrationDate,
        },
      };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public getUsers = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const users = await UsersService.getUsers();
      logger.info(`Got ${users.length} users`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: users,
      };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      logger.info(`Test users`);
      logger.info(ctx);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: 'hello, users!',
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };
}