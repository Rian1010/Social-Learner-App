import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { getNewUser, registerNewUser } from '../../http-common';
// import { useRegisterQuery } from '../../queries/registerQuery';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerification: '',
  });
  // const { data, isLoading, error, status } = useRegisterQuery(formData);

  const mutation = useMutation((userData: getNewUser) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return axios.post('/api/users', userData, config);
  });

  console.log(mutation.isLoading, mutation.error, mutation.isSuccess);

  const { name, email, password, passwordVerification } = formData;

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className='container'>
      <h1 className='display-2'>Sign Up</h1>
      <p className='lead'>Create an account!</p>
      <form
        action='#'
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({
            name,
            email,
            password,
          });
        }}
      >
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Register;
