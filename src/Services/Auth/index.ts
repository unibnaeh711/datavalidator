import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL + '/auth';


const register = async (
  payload: {
    username: string, 
    email: string, 
    password: string, 
    password2: string, 
    admin_key: string,
  }
): Promise<any> => {
  try { 
    const response = await axios.post(
      API_URL + '/register',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.data;
    return data;
  } catch (error: any) {
    if (error.response) {
      const errors = error.response.data;
      const errorMessage = `${Object.keys(errors)[0]}: ${errors[Object.keys(errors)[0]]}`
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};

const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(
      API_URL + '/token',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    const tokenPair = await response.data;
    return tokenPair;
  } catch (error: any) {
    throw error;
  }
};

const logout = async () => {
  localStorage.clear()
};

const isLoggedIn = () => {
  return !!localStorage.getItem('accessToken');
}

const getHeader = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
}

const AuthService = {
  register,
  login,
  logout,
  getHeader,
  isLoggedIn
};

export default AuthService;
