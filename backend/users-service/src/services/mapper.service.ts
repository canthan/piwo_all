import { StashModel } from '../models/stashes.model';
import { UserModel, StashConfigModel } from '../models/user.model';
import { Stash, User, UserNoPassword, Token, StashConfig } from '../types/types';
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

export const mapStashConfigOutDTO = (stashCongifModel: StashConfigModel): StashConfig => {
  const { name, cratesTotal } = stashCongifModel;

  return { name, cratesTotal }
}

export const mapUserOutDTO = (userModel: UserModel): User => {
  const { email, password, registrationDate, userId, firstname, surname, username, stashConfig } = userModel;

  return {
    email,
    password,
    registrationDate,
    userId,
    firstname,
    surname,
    username,
    stashConfig: stashConfig.map(config => mapStashConfigOutDTO(config)),
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
