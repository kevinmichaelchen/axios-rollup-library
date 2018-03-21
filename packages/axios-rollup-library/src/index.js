import axios from 'axios';

export const get = url => axios
  .get(url)
  .then(response => console.log(response))
  .catch(error => console.log(error));
