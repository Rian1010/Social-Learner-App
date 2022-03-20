import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import jwt_decode from 'jwt-decode';

const Landing: React.FC = () => {
  const { payload, isAuthenticated } = useAuthStore();

  if (payload !== '') {
    const decode = jwt_decode(payload);
    console.log(decode);
  }

  return (
    <section className='landing d-flex justify-content-center flex-column'>
      <div className='container mt-0'>
        <div className='row'>
          <div className='col h-100 text-white text-center'>
            <h1 className='display-1'>Social Learner App</h1>
            <p className='lead'>
              Create a profile, share posts, connect with people around the
              world!
            </p>
            {!isAuthenticated && (
              <>
                <Link to='/register' className='btn btn-primary'>
                  Register
                </Link>
                <Link to='/login' className='btn btn-light'>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
