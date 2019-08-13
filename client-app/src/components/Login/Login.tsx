import React from 'react';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { ErrorText } from '../Common/ErrorText/ErrorText';
import { ToastMessage } from '../Common/ToastMessage/ToastMessage';
import Auth from '../Auth/auth';

import { OverallAppState } from '../../reducers/initialState';
import { loginAsync } from '../../actions/app.actions';
import { LoginSchema, LoginFormValues, initialLoginFormValues } from '../../constants/schemas';
import { Routes } from '../../constants/routes';

import { AsyncResult } from '../../types/common.types';
import { LOGIN_SUCCESS } from '../../constants/app.action.types';

import './Login.scss';

interface MappedActions {
  loginAsync(email: string, password: string, register: boolean): AsyncResult;
}

interface MappedProps {
  error: string | null;
}

interface OwnProps {
  auth: Auth;
}

interface FormSubmitting {
  setSubmitting: (isSubmitting: boolean) => void,
}

type Props = OwnProps & MappedProps & MappedActions & RouterProps;

export function Login(props: Props) {
  const loginAsync = (email: string, password: string, register: boolean): AsyncResult => props.loginAsync(email, password, register);

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormSubmitting) => {
    // props.auth.login();
    setSubmitting(true);
    await loginAsync(values.email, values.password, values.register)
      .then(response => {
        if (response && response.type === LOGIN_SUCCESS) {
          props.history.push(Routes.storage);
        }
      })
      .catch(error => console.error(error))
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div className="container">
      {
        props.error ? <ToastMessage variant={'danger'}>{props.error}</ToastMessage> : null
      }
      <div className="row justify-content-md-center">
        <div className="login col-4">
          <Formik
            initialValues={initialLoginFormValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, handleSubmit, errors }) => (
              <Form>
                <div className="form-group common__form">
                  <label className="common__form__label">Email</label>
                  <Field
                    type="email"
                    className={`form-control common__form__input ${errors.email ? 'common__form__input--invalid' : ''} `}
                    name="email"
                    placeholder="Email address" />
                  <ErrorMessage name="email" render={msg => ErrorText({ message: msg })} />
                </div>
                <div className="form-group common__form">
                  <label className="common__form__label">Password</label>
                  <Field
                    type="password"
                    className={`form-control common__form__input ${errors.password ? 'common__form__input--invalid' : ''}`}
                    name="password"
                    placeholder="Password" />
                  <ErrorMessage name="password" render={msg => ErrorText({ message: msg })} />
                </div>
                <div className="form-group login__buttons">
                  <button
                    type="submit"
                    disabled={isSubmitting || !!Object.entries(errors).length}
                    className="btn btn-primary col-7">
                    Log in
                    </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setFieldValue('register', true);
                      handleSubmit();
                    }}
                    disabled={isSubmitting || !!Object.entries(errors).length}
                    className="btn btn-outline-secondary col-4">
                    Sign in
                    </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* to be removed */}
        {/* <button type="button" onClick={props.auth.login} className="btn btn-outline-success col-4">Sign in auth0</button> */}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: OverallAppState) => ({
  error: state.app.error,
})

const actions = {
  loginAsync
}

export default connect(
  mapStateToProps,
  actions
)(Login);
