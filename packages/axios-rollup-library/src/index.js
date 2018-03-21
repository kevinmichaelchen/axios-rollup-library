import axios from 'axios';

export const get = url =>
  axios
    .get(url)
    .then(response => response.data)
    .catch(error => ({ error }));
