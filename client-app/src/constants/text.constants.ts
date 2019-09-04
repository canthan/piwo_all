import { Routes } from './routes';

export enum ErrorMessages {
  emailRequired = 'Please enter email address',
  emailInvalid = 'Invalid email address',
  passwordRequired = 'Please enter password',
  passwordLength = 'Password is too short (min 8 characters)',
  pageNotFound = 'Page does not exist...',
}

export enum HeaderTitles {
  storage = 'Storage',
  storageTable = 'Storage Table View',
  login = 'Login',
  userProfile = 'User Profile',
  notExist = 'Page does not exist',
}

export const getHeaderTitle = (route: string): HeaderTitles => {
  switch (route) {
    case Routes.default:
    case Routes.callback:
      return HeaderTitles.login;
    case Routes.storage:
      return HeaderTitles.storage;
    case Routes.storageTable:
      return HeaderTitles.storageTable;
    case Routes.profile:
      return HeaderTitles.userProfile;
    default:
      return HeaderTitles.notExist;
  }
}
