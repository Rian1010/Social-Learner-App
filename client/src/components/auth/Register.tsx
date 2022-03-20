import axios from 'axios';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { getNewUser } from '../../http-common';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerification: '',
  });

  const mutation = useMutation((userData: getNewUser) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return axios.post('/api/users', userData, config);
  });

  console.log(
    mutation.isLoading,
    mutation.error,
    mutation.isError,
    mutation.isSuccess
  );

  const { name, email, password, passwordVerification } = formData;

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      name,
      email,
      password,
    });
    if (mutation.error !== null) e.target.submit();
  };
  return (
    <section className='container'>
      {mutation.error !== null ? (
        <div className='alert alert-danger' role='alert'>
          An error has occured!
        </div>
      ) : (
        <p>all good</p>
      )}
      <Fragment>
        <h1 className='display-2'>Sign Up</h1>
        <p className='lead'>Create an account!</p>
        <form action='#' onSubmit={(e) => formSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='exampleInputName' className='form-label'>
              Name
            </label>
            <input
              name='name'
              type='text'
              className='form-control'
              id='exampleInputName'
              aria-describedby='name'
              value={name}
              onChange={(e) => formChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              name='email'
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              value={email}
              onChange={(e) => formChange(e)}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              name='password'
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              value={password}
              onChange={(e) => formChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              name='passwordVerification'
              type='password'
              className='form-control'
              id='exampleInputPasswordVerification'
              value={passwordVerification}
              onChange={(e) => formChange(e)}
            />
          </div>
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div>
          {mutation.isLoading ? (
            <button className='btn btn-primary' disabled>
              Loading ...
            </button>
          ) : (
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          )}
        </form>
      </Fragment>
    </section>
  );
};

export default Register;
