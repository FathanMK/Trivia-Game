import axios from 'axios';

const axiosGRPC = axios.create({
  baseURL: 'http://10.0.2.2:50051/api',
});

export default axiosGRPC;
