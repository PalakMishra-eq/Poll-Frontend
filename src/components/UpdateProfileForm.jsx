import React, { useState } from "react";

const UpdateProfileForm = ({ userData, onSubmit }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(userData.bio);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      email,
      password,
      bio,
      profilePicture, // Optional, only include if updated
    };
    onSubmit(updatedData);  // Pass data to parent component to be handled
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);  // Set profile picture for upload
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <label>Profile Picture</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
