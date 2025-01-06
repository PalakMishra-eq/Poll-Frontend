import axios from "axios";

const BASE_URL = "https://interpolls.onrender.com/api";

export const fetchPolls = async () => {
  const response = await axios.get(`${BASE_URL}/polls`);
  return response.data;
};

export const fetchPollResults = async (pollId) => {
  const response = await axios.get(`${BASE_URL}/polls/${pollId}/results`);
  return response.data;
};
