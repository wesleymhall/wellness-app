import axios from 'axios';

// define the base URL for API
const BASE_URL = 'https://studious-halibut-pjwj4wrr5r95fj5w-5000.app.github.dev/';

// create axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export axios instance for import
export default api;