import axios from "axios";

// json-server --watch db.js
export const api = axios.create({
    baseURL:"http://localhost:3000"
})
