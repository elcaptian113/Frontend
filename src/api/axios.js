import axios from 'axios';
import { useState } from 'react';


export default axios.create({
    baseURL: 'http://localhost:8080'
});

