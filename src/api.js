import axios from "axios";

const API = axios.create({
  baseURL: "https://assessment-backend-1-ub77.onrender.com"
});

export default API;
