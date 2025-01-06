// src/pages/PollResultsPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PollResultsPage = () => {
  const { pollId } = useParams(); // Get poll ID from URL params
  const [pollResults, setPollResults] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollResults = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `https://interpolls.onrender.com/api/polls/${pollId}/results`,
          { headers: { Authorization: `${token}` } }
        );
        setPollResults(response.data);
      } catch (error) {
        console.error("Error fetching poll results:", error);
        setError(
          error.response?.data?.error || "Failed to fetch poll results."
        );
      }
    };

    fetchPollResults();
  }, [pollId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!pollResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading poll results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">{pollResults.pollTitle}</h1>
        <p className="text-gray-600 mb-6">{pollResults.pollDescription}</p>
        <p className="text-lg font-medium mb-4">
          Total Votes: {pollResults.totalVotes}
        </p>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Choice
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Vote Count
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            {pollResults.results.map((result, index) => (
              <tr
                key={index}
                className={`${
                  index === 0 ? "bg-green-100" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {result.choiceText}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {result.voteCount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {result.percentage.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => navigate("/poll-list")}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Back to Poll List
        </button>
      </div>
    </div>
  );
};

export default PollResultsPage;
