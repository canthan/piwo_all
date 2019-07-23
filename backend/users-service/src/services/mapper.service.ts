import { StashModel } from '../models/stashes.model';
import { UserModel } from '../models/user.model';
import { Stash, User, UserNoPassword } from '../types/types';

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
  const { email, password, registrationDate, userId, firstname, surname, username } = userModel;

  return {
    email,
    password,
    registrationDate,
    userId,
    firstname,
    surname,
    username,
  }
}

export const removePassword = (user: User): UserNoPassword => {
  const userNoPassword = { ...user };
  delete userNoPassword.password;

  return userNoPassword;
}
