import axios from 'axios';

export const BASE_URL =  'https://fastapiproject-hjm2.onrender.com/'; // Replace with your backend URL
// export const BASE_URL =  'http://172.23.179.185:8000/'; // Replace with your backend URL
// export const BASE_URL =  'https://127.0.0.1:8000'; // Replace with your backend URL

// export const BASE_URL = 'http://localhost:8000'


export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 20000, // Set an appropriate timeout
});