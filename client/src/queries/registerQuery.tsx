import { useMutation } from 'react-query';
import { getNewUser, registerNewUser } from '../http-common';

export const useRegisterQuery = (newUser: getNewUser) =>
  useMutation((register) => registerNewUser(register));
