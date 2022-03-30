import axios from "axios";

const api = axios.create({ baseURL: process.env.API_URL });
api.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

export default api;
