import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../apis/authApi';

export const useRegister = () => {
  return useMutation({ mutationFn: registerUser });
};
