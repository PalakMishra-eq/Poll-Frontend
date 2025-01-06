// src/pages/PollResultsPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PollResultsPage = () => {
  const { id } = useParams(); // Get poll ID from route parameters
  const navigate = useNavigate();

  const [pollData, setPollData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const response = await axios.get(
          `https://interpolls.onrender.com/api/polls/results/${id}`
        );
        setPollData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching poll results:", err);
        setError("Failed to fetch poll results. Please try again.");
        setLoading(false);
      }
    };

    fetchPollResults();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading poll results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">{pollData.title}</h1>
      <p className="text-gray-600 mb-4">{pollData.question}</p>
      <p className="text-gray-500 text-sm mb-6">
        Total Votes: <strong>{pollData.totalVotes}</strong>
      </p>

      {/* Choices and Results */}
      <div className="space-y-4">
        {pollData.choices.map((choice) => (
          <div
            key={choice._id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold">{choice.text}</h2>
            <p className="text-gray-600">
              Votes: <strong>{choice.voteCount}</strong>
            </p>
            <p className="text-gray-500 text-sm">
              Percentage: <strong>{choice.percentage}%</strong>
            </p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => navigate("/polls")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Poll List
        </button>
      </div>
    </div>
  );
};

export default PollResultsPage;
