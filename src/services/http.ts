import axios from "axios";

export const http = axios.create({
  baseURL: "https://movie-app-server-9gfs.onrender.com/api/v1",
});
