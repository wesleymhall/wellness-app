import axios from 'axios';

// define the base URL for API
const BASE_URL = 'http://127.0.0.1:5000';

// create axios instance with the base URL
// withCredentials to allow session cookies to be sent with requests
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export axios instance for import
export default apiClient;