import React from 'react';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { ErrorText } from '../Common/ErrorText/ErrorText';
import { LoginSchema } from '../../constants/schemas';
import { loginAsync } from '../../actions/app.actions';
import { AsyncResult } from '../../types/common.types';

import { LOGIN_SUCCESS } from '../../constants/app.action.types';

import './Login.scss';
import { Routes } from '../../constants/routes';

interface MappedActions {
  loginAsync(email: string, password: string, register: boolean): AsyncResult;
}

interface FormValues {
  email: string,
  password: string,
  register: boolean,
}
interface FormSubmitting {
  setSubmitting: (isSubmitting: boolean) => void,
}

type Props = MappedActions & RouterProps;

export function Login(props: Props) {
  const loginAsync = (email: string, password: string, register: boolean): AsyncResult => props.loginAsync(email, password, register);

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormSubmitting) => {
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
      <div className="row justify-content-md-center">
        <div className="login col-4">
          <Formik
            initialValues={{ email: 'andrzej.globisz@gmail.com', password: 'canthan12', register: false }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, handleSubmit }) => (
              <Form>
                <div className="form-group login__form">
                  <label className="login__form__label">Email</label>
                  <Field type="email" className="form-control login__form__input" name="email" placeholder="Email address" />
                  <ErrorMessage name="email" render={msg => ErrorText({ message: msg })} />
                </div>
                <div className="form-group login__form">
                  <label className="login__form__label">Password</label>
                  <Field type="password" className="form-control login__form__input" name="password" placeholder="Password" />
                  <ErrorMessage name="password" render={msg => ErrorText({ message: msg })} />
                </div>
                <div className="form-group login__buttons">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary col-7">
                    Log in
                    </button>
                  <button
                    type="submit"
                    onClick={() => {
                      setFieldValue('register', true);
                      handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="btn btn-outline-secondary col-4">
                    Sign in
                    </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = () => ({})

const actions = {
  loginAsync
}

export default connect(
  mapStateToProps,
  actions
)(Login);
