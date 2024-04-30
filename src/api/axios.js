import axios from 'axios';



const  axiosMain = axios.create({
    baseURL: 'http://localhost:8080'
});

export default axiosMain