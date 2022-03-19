import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
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
              <Link className='nav-link active' aria-current='page' to='/'>
                Developers
              </Link>
            </li>
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;