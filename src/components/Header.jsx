import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handlePollList = () => {
    navigate("/poll-list");
  };

  const handleVoteHistory = () => {
    navigate("/vote-history");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-blue-500 p-4 text-white">
      <h1 className="text-3xl font-bold">Poll App</h1>
      <div className="flex justify-end space-x-4 mt-4">
      <button
          onClick={() => navigate("/home")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/create-poll")}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Create Poll
        </button>
        <button
          onClick={handlePollList}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Poll List
        </button>
        <button
          onClick={handleVoteHistory}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Vote History
        </button>
        <button
          onClick={handleProfile}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
