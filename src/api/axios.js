import axios from 'axios';



const  axiosMain = axios.create({
    baseURL: 'https://geektomeapi.nw.r.appspot.com'
});

export default axiosMain