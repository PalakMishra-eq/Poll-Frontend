import axios from "axios";

// API call to get the user profile data
export const getProfile = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to update the user profile
export const updateProfile = async (updatedData) => {
  const formData = new FormData();
  for (const key in updatedData) {
    formData.append(key, updatedData[key]);
  }

  try {
    const response = await axios.put(
      "http://localhost:5000/api/user/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
