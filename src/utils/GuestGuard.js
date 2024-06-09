import React, { useContext } from 'react'
import { AppContext } from './AppContext';
import { Navigate } from 'react-router-dom';

const GuestGuard = ({children}) => {
   
    const appContext = useContext(AppContext);
    const { state, setState } = appContext;

  return (
    <div>{state.isAuthenticated?<Navigate to="/"/>:children}</div>
  )
}

export default GuestGuard