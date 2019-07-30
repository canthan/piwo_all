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

export interface LoginFormValues {
  email: string,
  password: string,
  register: boolean,
}

export const initialLoginFormValues: LoginFormValues = {
  email: '',
  password: '',
  register: false,
}

export const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email(ErrorMessages.emailInvalid)
    .required(ErrorMessages.emailRequired),
  firstname: Yup.string(),
  surname: Yup.string(),
});

export interface ProfileFormValues {
  email: string,
  firstname: string,
  surname: string,
}

export const initialProfileFormValues: ProfileFormValues = {
  email: '',
  firstname: '',
  surname: '',
}

export const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, ErrorMessages.passwordLength)
    .required(ErrorMessages.passwordRequired),
  newPassword: Yup.string()
    .min(8, ErrorMessages.passwordLength)
    .required(ErrorMessages.passwordRequired),
  confirmPassword: Yup.string()
    .min(8, ErrorMessages.passwordLength)
    .required(ErrorMessages.passwordRequired),
});

export interface PasswordFormValues {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}

export const initialPasswordFormValues: PasswordFormValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}
