import axios from 'axios';
import { useState } from 'react';


export default axios.create({
    baseURL: 'http://localhost:8080'
});

export const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const [errMsg, setErrMsg] = useState('');

        try {
          const response = await axios.post('/refresh', { withCredentials: true });

          const { userid } = response.data.userid;
          const { username } = response.data.username;
          const { usertype } = response.data.usertype;
          const { token } = response.data.accessToken;
            
            localStorage.setItem('userid', userid);
            localStorage.setItem('username', username);
            localStorage.setItem('usertype', usertype);
            localStorage.setItem('accessToken', token);
            localStorage.setItem('loggedIn', 1)
  
  
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Refresh Token Invalid');
            } else if (err.response?.status === 401) {
                setErrMsg('No Token Present');
            } else if (err.response?.status === 403) {
                setErrMsg('User Credentials do not match');
            } else {
                setErrMsg('Refresh Failed');
            }
        }
      }
  
      return Promise.reject(error);
    }
  ); 
  
