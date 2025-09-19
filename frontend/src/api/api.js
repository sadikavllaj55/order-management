import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
    baseURL: "http://localhost/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;

