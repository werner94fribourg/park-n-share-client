import axios from 'axios';
import { API_URL } from './globals';

export const signin = async (data) => {
    console.log(data);
   const response = await axios.post(`${API_URL}/users/signin`, data);
   console.log(response);
   const {status} = response;
   if (status === 200) {
      return response;
   } else {
    // TODO: Handle error
   }
}

export const confirmPin = async (data) => {
    const response = await axios.post(`${API_URL}/users/confirm-pin`,data);
    const {status} = response;
    if (status === 200) {
       return response;
    } else {
     // TODO: Handle error
    }
   
 
 }