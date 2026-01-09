import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { logout } from '../../features/auth/authSlice';

const Logout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <p className="text-center mt-20">Logging out...</p>;
};

export default Logout;
