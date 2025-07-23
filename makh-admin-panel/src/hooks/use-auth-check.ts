"use client"
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { RootState } from './../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { userLoggedIn } from '@/redux/auth/authSlice';

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const {user} = useSelector((state:RootState) => state.auth)
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  useEffect(() => {
    const localAuth = Cookies.get('admin')

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return {
    authChecked,
    user,
  };
  
}