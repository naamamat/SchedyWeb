import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=> {
    axiosInstance.get('/user').then((res)=> {
      console.log(res.data.user)
      if (res.data.user) {
        setUser(res.data.user)
        navigate('/homePage');
      }
    }).catch((e)=> {
      setUser(null)
    })
  },[])

  useEffect(()=> {
    if (!user) {
      navigate('/')
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () =>  useContext(UserContext);

export default UserContext;
