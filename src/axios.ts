import axios from "axios";

export const axiosTMDBClient = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
});

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});
