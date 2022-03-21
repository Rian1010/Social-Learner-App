import axios from 'axios';
import React, { Fragment } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';
import { getNewUser } from '../../interfaces';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerification: '',
  });
  const navigate = useNavigate();

  const { setPayload, setIsAuthenticated } = useAuthStore();

  const mutation = useMutation(
    (userData: getNewUser) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      return axios.post('/api/users', userData, config);
    },
    {
      onSuccess: (data) => {
        setPayload(data.data.token);
        setIsAuthenticated(true);
        const decode = jwt_decode(data.data.token);
        // console.log(decode);
        navigate('/');
      },
      onError: (error) => {
        console.error(error);
      },
    }
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
        <h1 className='display-2'>Sign Up</h1>
      )}
      <Fragment>
        <p className='lead'>Create an account!</p>
        <form onSubmit={(e) => formSubmit(e)} method='POST'>
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
              required
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
              required
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
        <p>
          Already have an account? <Link to='/login'>Login here!</Link>
        </p>
      </Fragment>
    </section>
  );
};

export default Register;
