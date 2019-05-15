import axios from "axios";
//import { getLocalToken } from "./utility";

const APIURL = `${process.env.REACT_APP_BACKEND_URL}`;

let service = axios.create({
  baseURL: APIURL,
  withCredentials: true
});


export const signup = (userInfos) => service.post(`${APIURL}/signup`, userInfos);

export const login = (userInfos) => service.post(`${APIURL}/login`, userInfos);

export const logout = () => service.post(`${APIURL}/logout`);