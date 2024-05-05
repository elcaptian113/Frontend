import axios from 'axios';
import axiosMain from './axios';


const api = axios.create({
  baseURL: 'https://backend-0d0j.onrender.com/',
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error)
  );

  

api.interceptors.response.use(
    (response) => response,
    async (error) => {

      const originalRequest = error.config;
        ;
      
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        
     
          const refreshToken = localStorage.getItem('refreshToken');  
          const refresh = await axiosMain.post('/refresh', { refreshToken });

          const { userid } = refresh.data.userid;
          const { username } = refresh.data.userid;
          const { usertype } = refresh.data.userid;
  
            localStorage.setItem('userid', userid);
            localStorage.setItem('username', username);
            localStorage.setItem('usertype', usertype);
            localStorage.setItem('accessToken', refresh.data.accessToken);
            localStorage.setItem('loggedIn', 1)
  
  
          originalRequest.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
          return axios(originalRequest);
      }
      
      return Promise.reject(error);
    }
  ); 
  
export default api