import axios from 'axios';

export interface getNewUser {
  name: string;
  email: string;
  password: string;
}

export const registerNewUser = async (userData: getNewUser) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('/api/users', userData, config);
};
