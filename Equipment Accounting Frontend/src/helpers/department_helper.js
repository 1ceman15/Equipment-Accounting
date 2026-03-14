import axios from "axios";
import { getUser } from "./auth_helper";

const API_URL = "http://localhost:8080/api/v1/departments";

const getHeaders = async () => {

  const user = await getUser();

  return {
    Accept: "application/json",
    Authorization: "Bearer " + user.access_token
  };
};

export const getAllDepartments = async () => {

  const headers = await getHeaders();

  return axios.get(API_URL, { headers });
};

export const createDepartment = async (department) => {

  const headers = await getHeaders();

  return axios.post(API_URL, department, { headers });
};