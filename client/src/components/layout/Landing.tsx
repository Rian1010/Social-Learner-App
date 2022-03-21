import axios from 'axios';
import React, { Fragment } from 'react';
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
    <Fragment>
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

      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-4'>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(./showcase.jpg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
            </div>
            <div className='col-sm-12 col-md-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sunt
              fugiat architecto officia, sint commodi, beatae velit expedita
              repellat libero, voluptate saepe sapiente eum perferendis alias
              corporis! Nulla sed nostrum recusandae asperiores nemo, quibusdam
              praesentium reprehenderit mollitia esse dolores adipisci omnis
              eius quae, earum blanditiis ipsa ut facilis iusto perferendis
              repellendus neque nesciunt distinctio nam nobis. Iusto atque
              necessitatibus recusandae, voluptas, labore corporis magnam omnis
              in beatae eius fugiat dolore consequatur harum molestiae
              exercitationem ducimus laboriosam, porro numquam assumenda!
              Veniam, eveniet laudantium eos nisi repellendus distinctio
              similique! Eos harum, pariatur, provident debitis ut quisquam
              architecto deleniti id temporibus atque at.
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
