import { StashModel } from '../models/stashes.model';
import { UserModel } from '../models/user.model';
import { Stash, User, UserNoPassword, Token } from '../types/types';
import { TokenModel } from '../models/token.model';

export const mapStashOutDTO = (stashModel: StashModel): Stash => {
  const { name, batchId, stashId, userId, items } = stashModel;

  return {
    name,
    batchId,
    stashId,
    userId,
    items,
  }
}

export const mapUserOutDTO = (userModel: UserModel): User => {
  const { email, password, registrationDate, userId, firstname, surname, username, stashConfig } = userModel;

  return {
    email,
    password,
    registrationDate,
    stashConfig,
    userId,
    firstname,
    surname,
    username,
  }
}

export const mapTokenOutDTO = (tokenModel: TokenModel): Token => {
  const { userId, token, creationDate, expirationDate } = tokenModel;

  return {
    userId, 
    token, 
    creationDate, 
    expirationDate,
  }
}

export const removePassword = (user: User): UserNoPassword => {
  const userNoPassword = { ...user };
  delete userNoPassword.password;

  return userNoPassword;
}
