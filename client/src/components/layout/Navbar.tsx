import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';

const Navbar: React.FC = () => {
  const { setPayload, isAuthenticated, setIsAuthenticated } = useAuthStore();

  const logout = () => {
    setPayload('');
    setIsAuthenticated(false);
  };

  return (
    <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Social Learner App
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/'>
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' aria-current='page' to='/profile'>
                    Profile
                  </Link>
                </li>

                <li className='nav-item' onClick={() => logout()}>
                  <Link className='nav-link' to='/login'>
                    Logout
                  </Link>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>
                    Register
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
