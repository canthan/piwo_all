import * as Yup from 'yup';

import { ErrorMessages } from './text.constants';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(ErrorMessages.emailInvalid)
    .required(ErrorMessages.emailRequired),
  password: Yup.string()
    .min(8, ErrorMessages.passwordLength)
    .required(ErrorMessages.passwordRequired),
});
