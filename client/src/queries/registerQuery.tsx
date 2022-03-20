import { useMutation } from 'react-query';
import { getNewUser, registerNewUser } from '../http-common';

export const useRegisterQuery = () => {
  useMutation((newUser: getNewUser) => registerNewUser(newUser));
};
