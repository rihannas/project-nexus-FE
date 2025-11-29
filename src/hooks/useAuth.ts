import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout, register } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    ...auth,
    login: (credentials: { username: string; password: string }) =>
      dispatch(login(credentials) as any),
    logout: () => dispatch(logout()),
    register: (userData: {
      username: string;
      email: string;
      password: string;
    }) => dispatch(register(userData) as any),
  };
};
