// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import axios from "../utils/api";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    profilePicture: "",
    bio: "",
    interests: [],
  });

  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Controls whether editing mode is enabled

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://interpolls.onrender.com/api/users/profile", {
        headers: { Authorization: ` ${token}` },
      });
      setProfileData(response.data);
      setBio(response.data.bio);
      setInterests(response.data.interests.join(", "));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();

    if (!profilePicture) return;

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    
    // Get the userId from the localStorage (or any other method depending on your auth strategy)
    const userId = localStorage.getItem("userId"); // Make sure you store userId in localStorage when the user logs in
    formData.append("userId", userId);

    try {
        const token = localStorage.getItem("token");

        // Make the POST request to the backend with the profile picture and userId
        const response = await axios.post(
            "/api/users/upload-profile-picture",
            formData,
            {
                headers: {
                    "Authorization": ` ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
        );

        // If successful, update the profile picture state
        setProfileData((prev) => ({
            ...prev,
            profilePicture: response.data.profilePicture,
        }));

        alert("Profile picture updated successfully");
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Error uploading profile picture");
    }
};


  const handleBioInterestsUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://interpolls.onrender.com/api/users/update-profile",
        { bio, interests: interests.split(",").map((i) => i.trim()) },
        {
          headers: { Authorization: ` ${token}` },
        }
      );
      alert("Profile updated successfully");
      fetchProfile(); // Refresh the profile data
    } catch (error) {
      console.error("Error updating bio/interests:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Profile</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileData.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border"
          />
          <form onSubmit={handleProfilePictureUpload} className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Profile Picture
            </button>
          </form>
        </div>

        {/* Bio and Interests Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows="3"
            disabled={!isEditing}
          />
          <h2 className="text-xl font-semibold mb-4">Interests</h2>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Enter interests, separated by commas"
            className="w-full p-2 border rounded"
            disabled={!isEditing}
          />
          <div className="flex justify-between mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleBioInterestsUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            )}
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setBio(profileData.bio);
                  setInterests(profileData.interests.join(", "));
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
