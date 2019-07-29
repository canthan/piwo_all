export enum ErrorMessages {
  emailRequired = 'Please enter email address',
  emailInvalid = 'Invalid email address',
  passwordRequired = 'Please enter password',
  passwordLength = 'Password is too short (min 8 characters)',
  pageNotFound = 'Page does not exist...',
}

export enum HeaderTitles {
  storage = 'Storage',
  login = 'Login',
  userProfile = 'User Profile',
  notExist = 'Page does not exist',
}

export const getHeaderTitle = (route: string): HeaderTitles => {
  switch (route) {
    case '/':
      return HeaderTitles.login;
    case '/storage':
      return HeaderTitles.storage;
    case '/profile':
      return HeaderTitles.userProfile;
    default:
      return HeaderTitles.notExist;
  }
}
