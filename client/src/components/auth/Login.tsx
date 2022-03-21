import axios from 'axios';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getNewUser } from '../../interfaces';
import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setPayload, setIsAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  const mutation = useMutation(
    (userData: getNewUser) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return axios.post('/api/auth', userData, config);
    },
    {
      onSuccess: (data) => {
        setPayload(data.data.token);
        setIsAuthenticated(true);
        navigate('/');
      },
    }
  );

  console.log(
    mutation.isLoading,
    mutation.error,
    mutation.isError,
    mutation.isSuccess
  );

  const { email, password } = formData;

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
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
        <h1 className='display-2'>Sign In</h1>
      )}
      <Fragment>
        <p className='lead'>Sign into your account!</p>
        <form method='POST' onSubmit={(e) => formSubmit(e)}>
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
              required
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
              required
            />
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
        <p>
          Don't have an account yet? <Link to='/register'>Register now!</Link>
        </p>
      </Fragment>
    </section>
  );
};

export default Login;
