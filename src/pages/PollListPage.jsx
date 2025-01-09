// src/pages/PollListPage.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";



const PollListPage = () => {
  const [polls, setPolls] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("expirationDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // Fetch polls on component mount and whenever filters change
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(
          "https://interpolls.onrender.com/api/polls",
          {
            params: {
              search: searchQuery,
              status: filterStatus,
              sortBy,
              sortOrder,
            },
          }
        );
        setPolls(response.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
        setError("Failed to fetch polls. Please try again.");
      }
    };

    fetchPolls();
  }, [searchQuery, filterStatus, sortBy, sortOrder]);


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Header */}
    <Header />
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-2xl font-bold mb-4">Poll List</h1>

      {/* Search, Filter, and Sort Options */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search polls..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 md:mb-0"
        />

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mb-4 md:mb-0"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="upcoming">Upcoming</option>
        </select>

        {/* Combined Sort Dropdown */}
<select
  value={`${sortBy}-${sortOrder}`} // Combine sort field and order in the value
  onChange={(e) => {
    const [field, order] = e.target.value.split("-");
    setSortBy(field);
    setSortOrder(order);
  }}
  className="border border-gray-300 rounded px-3 py-2 mb-4 md:mb-0"
>
  <optgroup label="Sort By">
    <option value="startDate-asc">Start Date (Ascending)</option>
    <option value="startDate-desc">Start Date (Descending)</option>
    <option value="expirationDate-asc">Expiration Date (Ascending)</option>
    <option value="expirationDate-desc">Expiration Date (Descending)</option>
    <option value="title-asc">Title (A-Z)</option>
    <option value="title-desc">Title (Z-A)</option>
  </optgroup>
</select>

      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}


      {/* Poll List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold">{poll.title}</h2>
            <p className="text-gray-600">{poll.question}</p>
            <p className="text-gray-500 text-sm mt-2">
              Expiration: {new Date(poll.expirationDate).toLocaleString()}
            </p>
            <button
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() =>
        poll.isActive
          ? navigate(`/vote/${poll._id}`) // Navigate to vote page
          : navigate(`/polls/${poll._id}/results`) // Navigate to results page
      }
    >
      {poll.isActive ? "Vote" : "Results"}
    </button>
          </div>
        ))}
      </div>
    </div>
     {/* Footer */}
     <Footer />
    </div>
  );
};

export default PollListPage;
