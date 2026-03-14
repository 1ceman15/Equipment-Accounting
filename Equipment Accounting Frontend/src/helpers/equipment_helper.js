import axios from "axios";
import { getUser } from "./auth_helper";

const API_URL = "http://localhost:8080/api/v1/equipment";

const getHeaders = async () => {
  console.log("getHeaders: fetching user...");
  const user = await getUser();
  console.log("getHeaders: user received", user ? "has token" : "no user");

  if (!user || !user.access_token) {
    console.error("getHeaders: user not logged in or missing token");
    throw new Error("User not logged in");
  }

  return {
    Accept: "application/json",
    Authorization: "Bearer " + user.access_token
  };
};

export const getAllEquipment = async () => {
  console.log("getAllEquipment: called");
  try {
    const headers = await getHeaders();
    console.log("getAllEquipment: headers obtained, making request to", API_URL);
    const response = await axios.get(API_URL, { headers });
    console.log("getAllEquipment: request successful", response);
    return response;
  } catch (error) {
    console.error("getAllEquipment: error", error);
    throw error;
  }
};

export const createEquipment = async (equipment) => {
  console.log("createEquipment: called with equipment", equipment);
  try {
    const headers = await getHeaders();
    console.log("createEquipment: headers obtained, making POST request to", API_URL);
    const response = await axios.post(API_URL, equipment, { headers });
    console.log("createEquipment: request successful", response);
    return response;
  } catch (error) {
    console.error("createEquipment: error", error);
    throw error;
  }
};