import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handlePollList = () => {
    navigate("/poll-list");
  };

  const handleVoteHistory = () => {
    navigate("/vote-history");
  };

  const handleProfile = () => {
    navigate("/profile"); // Redirects to the User Profile Page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with buttons */}
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-3xl font-bold">Poll App</h1>
        <div className="flex justify-end space-x-4 mt-4">
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
        </div>
      </header>

      {/* Content section */}
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome to the Poll App
        </h2>
        <p className="text-center mb-6">
          Manage your polls, vote on them, and view your vote history here!
        </p>
        <div className="w-full max-w-md">
          <button
            onClick={handlePollList}
            className="bg-blue-500 hover:bg-blue-700 text-white w-full py-3 rounded"
          >
            View Poll List
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
