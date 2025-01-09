// src/pages/VoteHistoryPage.jsx
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "../utils/api"; // Adjust this path if needed

const VoteHistoryPage = () => {
  const [voteHistory, setVoteHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoteHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authorization token missing. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://interpolls.onrender.com/api/polls/my-votes",
          {
            headers: { Authorization: token },
          }
        );

        setVoteHistory(response.data.polls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vote history:", err);
        setError("Failed to fetch vote history. Please try again.");
        setLoading(false);
      }
    };

    fetchVoteHistory();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Vote History</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {voteHistory.length === 0 ? (
        <p className="text-gray-600">You haven't voted on any polls yet.</p>
      ) : (
        <div className="space-y-6">
          {voteHistory.map((poll, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold">{poll.pollTitle}</h2>
              <p className="text-gray-600 mb-2">{poll.pollDescription}</p>

              <div className="mb-2">
                <strong>Your Vote(s):</strong>
                <ul className="list-disc ml-6">
                  {poll.userVotedChoice.map((choice, i) => (
                    <li key={i}>
                      {choice.choiceText} - {choice.percentage}% votes
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>Highest Voted Choice:</strong>
                <p>
                  {poll.highestVotedChoice
                    ? `${poll.highestVotedChoice.choiceText} - ${poll.highestVotedChoice.percentage}`
                    : "No votes cast yet"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
     {/* Footer */}
     <Footer />
     </div>
  );
};

export default VoteHistoryPage;
