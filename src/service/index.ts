import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://price-medium.herokuapp.com/api/v2/'
})

export default Api;