import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../_base/appHook';
import { authInfoReducer } from './info/authInfoReducer';
import { AuthActions } from './authAction';

export const useAppAuth = () => {
  const authInfo = useAppSelector(authInfoReducer);
  const dispatch = useDispatch();

  const isAuth = useMemo(() => {
    return authInfo.isAuth === true;
  }, [authInfo]);

  const authActions = useMemo(() => ({
    signIn: (authInfo) => dispatch(AuthActions.USER_SIGN_IN_ACTION(authInfo)),
    signOut: () => dispatch(AuthActions.USER_SIGN_OUT_ACTION())
  }), [dispatch]);
  return [isAuth, authActions, authInfo];
};