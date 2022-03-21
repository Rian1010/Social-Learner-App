import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useMutation } from 'react-query';
import { IPayload, IProfile } from '../../interfaces';
import { useNavigate } from 'react-router';

const CreateProfile = () => {
  const { payload } = useAuthStore();

  const [formData, setFormData] = useState({
    company: 'Test company',
    status: '',
    skills: '',
  });

  const navigate = useNavigate();

  const decode = jwt_decode<IPayload>(localStorage.userToken);

  const mutation = useMutation(
    (userData: IProfile) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.userToken,
        },
      };

      return axios.post('/api/profile', userData, config);
    },
    {
      onSuccess: () => {
        navigate('/profile');
      },
    }
  );

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(decode);
  const formSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      user: decode?.user.id,
      company,
      status,
      skills,
    });
    if (mutation.error !== null) e.target.submit();
  };

  const { company, status, skills } = formData;

  return (
    <div className='container'>
      <form onSubmit={(e) => formSubmit(e)} method='POST'>
        <div className='mb-3'>
          <label htmlFor='exampleInputCompany' className='form-label'>
            Company
          </label>
          <input
            name='company'
            type='text'
            className='form-control'
            id='exampleInputCompany'
            aria-describedby='company'
            value={company}
            onChange={(e) => formChange(e)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputstatus' className='form-label'>
            Status
          </label>
          <input
            name='status'
            type='text'
            className='form-control'
            id='exampleInputstatus'
            aria-describedby='status'
            value={status}
            onChange={(e) => formChange(e)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputSkills' className='form-label'>
            Skills
          </label>
          <input
            name='skills'
            type='skills'
            className='form-control'
            id='exampleInputSkills'
            value={skills}
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
    </div>
  );
};

export default CreateProfile;
