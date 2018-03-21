import axios from 'axios';

export const get = axios
  .get('/user?ID=12345')
  .then(response => console.log(response))
  .catch(error => console.log(error));
