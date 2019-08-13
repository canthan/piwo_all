import React, { useState, useEffect } from 'react';
import { RouterProps } from 'react-router';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { ErrorText } from '../Common/ErrorText/ErrorText';
import { ToastMessage } from '../Common/ToastMessage/ToastMessage';
import { isObjectEmpty } from '../../utils/utils.service';

import { initialProfileFormValues, ProfileFormValues, ProfileSchema } from '../../constants/schemas';
import { editProfileAsync } from '../../actions/app.actions';
import { OverallAppState } from '../../reducers/initialState';

import { AsyncResult } from '../../types/common.types';
import { User, UserProfileFields } from '../../types/app.types';

import './UserProfile.scss';
import Auth from '../Auth/auth';

interface OwnProps {
  auth: Auth;
}

interface MappedProps {
  error: string | null;
  userId: string;
  email: string;
  firstname: string;
  surname: string;
}

interface MappedActions {
  editProfileAsync(userData: UserProfileFields): AsyncResult;
}

type FormValues = Pick<User, "email" | "firstname" | "password" | "surname"> & {
  confirmPassword: string;
}

interface FormSubmitting {
  setSubmitting: (isSubmitting: boolean) => void,
}

type Props = OwnProps & MappedProps & MappedActions & RouterProps;

export function UserProfile(props: Props) {

  const [profile, setProfile] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadProfile();
  })

  const loadProfile = () => {
    // props.auth.getProfile((profile, error) => {
    //   console.log(profile)
    //   console.log(error)
    //   setProfile(profile);
    //   setError(error && error.description);
    // })
  }

  const editProfileAsync = (userData: UserProfileFields): AsyncResult => props.editProfileAsync(userData);

  const handleSubmit = async (values: ProfileFormValues, { setSubmitting }: FormSubmitting) => {
    setSubmitting(true);
    const { email, firstname, surname } = values;
    await editProfileAsync({ email, firstname, surname, userId: props.userId })
      // .then(response => {
      //   if (response && response.type === LOGIN_SUCCESS) {
      //     props.history.push(Routes.storage);
      //   }
      // })
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
      {
        error
          ? <span>{error}</span>
          : <div className="row justify-content-md-center">
            <div className="login col-4">
              <Formik
                initialValues={{
                  ...initialProfileFormValues,
                  email: props.email,
                  firstname: props.firstname,
                  surname: props.surname,
                }}
                validationSchema={ProfileSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, dirty, handleReset, handleSubmit, errors }) => {
                  return (
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
                        <label className="common__form__label">Name</label>
                        <Field
                          type="firstname"
                          className={`form-control common__form__input ${errors.firstname ? 'common__form__input--invalid' : ''}`}
                          name="firstname"
                          placeholder="Name" />
                        <ErrorMessage name="firstname" render={msg => ErrorText({ message: msg })} />
                      </div>
                      <div className="form-group common__form">
                        <label className="common__form__label">Surname</label>
                        <Field
                          type="surname"
                          className={`form-control common__form__input ${errors.surname ? 'common__form__input--invalid' : ''}`}
                          name="surname"
                          placeholder="Surname" />
                        <ErrorMessage name="surname" render={msg => ErrorText({ message: msg })} />
                      </div>
                      <div className="form-group common__form">
                        <label className="common__form__label">Password</label>
                        <button
                          type="button"
                          disabled={isSubmitting}
                          className="btn btn-secondary col-12">
                          Change password
                  </button>
                      </div>
                      <div className="form-group login__buttons">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isObjectEmpty(errors) || !dirty}
                          onClick={() => {
                            handleSubmit();
                          }}
                          className="btn btn-primary col-7">
                          Save
                  </button>
                        <button
                          type="button"
                          disabled={isSubmitting || !dirty}
                          onClick={handleReset}
                          className="btn btn-outline-secondary col-4">
                          Reset
                  </button>
                      </div>
                    </Form>
                  )
                }
                }
              </Formik>
            </div>
          </div>
      }
    </div>
  )
}


const mapStateToProps = (state: OverallAppState) => {
  const { error, user } = state.app;
  const { userId, email, firstname = '', surname = '' } = user;

  return { error, userId, email, firstname, surname }
}

const actions = {
  editProfileAsync,
}

export default connect(
  mapStateToProps,
  actions
)(UserProfile);
