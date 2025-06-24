import axios from "axios";

const api = axios.create({
  baseURL:"https://milestone-tracker-community-tips.onrender.com"
});
export default api;