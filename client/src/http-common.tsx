import axios from 'axios';

export interface getNewUser {
  name: string;
  email: string;
  password: string;
}

export const registerNewUser = async (newUser: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(newUser);

  const res = await axios.post('/api/users', body, config);

  return res;
};
