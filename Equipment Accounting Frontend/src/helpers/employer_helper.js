import axios from "axios";
import { getUser } from "./auth_helper";

const API_URL = "http://localhost:8080/api/v1/employers";

const getHeaders = async () => {

  const user = await getUser();

  if (!user || !user.access_token) {
    throw new Error("User not logged in");
  }

  return {
    Accept: "application/json",
    Authorization: "Bearer " + user.access_token
  };
};

export const getAllEmployers = async () => {

  const headers = await getHeaders();

  return axios.get(API_URL, { headers });
};

export const createEmployer = async (employer) => {

  const headers = await getHeaders();

  return axios.post(API_URL, employer, { headers });
};