import { useDispatch } from 'react-redux';

import AuthService from '../Services/Auth';
import { login } from '../Slices/authSlice'


const useAuth = () => {
  const dispatch = useDispatch();
  if (AuthService.isLoggedIn()) {
    dispatch(login());
  }
};

export default useAuth;