import axios from "axios";
import { getUser } from "./auth_helper";

const API_URL = "http://localhost:8080/api/v1/employers";

const getHeaders = async () => {
  console.log("getHeaders (employer): fetching user...");
  const user = await getUser();
  console.log("getHeaders (employer): user received", user ? "has token" : "no user");

  if (!user || !user.access_token) {
    console.error("getHeaders (employer): user not logged in or missing token");
    throw new Error("User not logged in");
  }

  return {
    Accept: "application/json",
    Authorization: "Bearer " + user.access_token
  };
};

export const getAllEmployers = async () => {
  console.log("getAllEmployers: called");
  try {
    const headers = await getHeaders();
    console.log("getAllEmployers: headers obtained, making request to", API_URL);
    const response = await axios.get(API_URL, { headers });
    console.log("getAllEmployers: request successful", response);
    return response;
  } catch (error) {
    console.error("getAllEmployers: error", error);
    throw error;
  }
};

export const createEmployer = async (employer) => {
  console.log("createEmployer: called with employer", employer);
  try {
    const headers = await getHeaders();
    console.log("createEmployer: headers obtained, making POST request to", API_URL);
    const response = await axios.post(API_URL, employer, { headers });
    console.log("createEmployer: request successful", response);
    return response;
  } catch (error) {
    console.error("createEmployer: error", error);
    throw error;
  }
};