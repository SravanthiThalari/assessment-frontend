import axios from "axios";

const API = axios.create({
  baseURL: "https://assessment-backend-fkvk.onrender.com"
});

export default API;