import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { logout as logoutAction } from "../../Slices/authSlice";
import AuthService from "../../Services/Auth";


const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(logoutAction());
  AuthService.logout();

  return (
    <Navigate to="/" />
  )
};

export default LogoutPage;
