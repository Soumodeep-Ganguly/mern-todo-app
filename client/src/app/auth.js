import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// auth context
export const AuthContext = React.createContext();

export function AuthProvider({ children }){

    const cache = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(cache);
    const [dark, setDark] = useState(localStorage.getItem('darkMode'))
  
    function signin(res){
      if (res.data){
  
        localStorage.setItem('user', JSON.stringify(res.data));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
  
        return window.location = '/'
  
      }
    }
  
    async function signout(){
  
      localStorage.clear();
      return window.location = '/signin'
  
    }
  
    return (
        <AuthContext.Provider value={{
            dark, setDark,
            user: user,
            signin: signin,
            signout: signout
          }}
        > 
          {children}
        </AuthContext.Provider>
    );
}

export function PrivateRoute(props){  
    // check user exists
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.token){ 
        return props.children
    }
    return <Navigate to='/signin' />;

}