import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordVerification: '',
  });

  const { name, email, password, passwordVerification } = formData;

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordVerification) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className='container'>
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Register;
