import axios from 'axios';



const  axiosMain = axios.create({
    baseURL: 'https://backend-0d0j.onrender.com/'
});

export default axiosMain