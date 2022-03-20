import { Fragment } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Profile from './components/layout/Profile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </Fragment>
    </Router>
  );
};

export default App;
