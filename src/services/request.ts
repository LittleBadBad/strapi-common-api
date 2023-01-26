import axios from "axios";

export const strapiRequest = axios.create({
    baseURL: process.env.REACT_APP_STRAPI_API || "http://localhost:1337/api",
    timeout: 10000
});
