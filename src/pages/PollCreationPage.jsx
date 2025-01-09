import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const PollCreationPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [pollType, setPollType] = useState("single-choice");
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      title,
      question,
      choices,
      pollType,
      expirationDate,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://interpolls.onrender.com/api/polls/create",
        payload,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setSuccess("Poll created successfully!");
      navigate("/polls"); // Redirect to polls list page
    } catch (err) {
      console.error("Error creating poll:", err);
      setError(err.response?.data?.message || "Failed to create poll.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header */}
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-2xl font-bold mb-6">Create a Poll</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded w-96 space-y-4"
      >
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Choices</label>
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              {choices.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeChoice(index)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addChoice}
            className="mt-2 text-blue-500 font-bold"
          >
            Add Choice
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium">Poll Type</label>
          <select
            value={pollType}
            onChange={(e) => setPollType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="single-choice">Single Choice</option>
            <option value="multiple-choice">Multiple Choice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Expiration Date</label>
          <input
            type="datetime-local"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Create Poll
        </button>
      </form>
      
    </div>
    {/* Footer */}
    <Footer />
    </div>
  );
};

export default PollCreationPage;
