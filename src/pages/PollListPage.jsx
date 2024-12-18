// src/pages/PollListPage.js
import axios from "axios";
import React, { useEffect, useState } from "react";

const PollListPage = () => {
  const [polls, setPolls] = useState([]); // State to store polls
  const [search, setSearch] = useState(""); // State for search input
  const [status, setStatus] = useState(""); // State for filter by status
  const [sortBy, setSortBy] = useState("expirationDate"); // State for sort by field
  const [sortOrder, setSortOrder] = useState("asc"); // State for sort order
  const [error, setError] = useState(""); // State for error messages

  // Fetch polls from API
  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/polls", {
        params: {
          search,
          status,
          sortBy,
          sortOrder,
        },
      });
      setPolls(response.data); // Update polls state
      setError(""); // Clear error if successful
    } catch (error) {
      console.error("Error fetching polls:", error);
      setError("Failed to load polls. Please try again later.");
    }
  };

  // Fetch polls whenever search, status, sortBy, or sortOrder changes
  useEffect(() => {
    fetchPolls();
  }, [search, status, sortBy, sortOrder]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold my-6">Poll List</h1>

      {/* Search, Filter, and Sort Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search polls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="upcoming">Upcoming</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="expirationDate">Expiration Date</option>
          <option value="title">Title</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Poll List */}
      <div className="w-full max-w-4xl">
        {polls.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg">
            {polls.map((poll) => (
              <li
                key={poll._id}
                className="border-b border-gray-200 px-6 py-4 hover:bg-gray-50"
              >
                <h2 className="text-xl font-bold">{poll.title}</h2>
                <p className="text-gray-600">{poll.description}</p>
                <p className="text-gray-500">
                  <strong>Status:</strong>{" "}
                  {poll.active
                    ? poll.expirationDate > new Date().toISOString()
                      ? "Active"
                      : "Expired"
                    : "Upcoming"}
                </p>
                <p className="text-gray-500">
                  <strong>Expiration Date:</strong>{" "}
                  {new Date(poll.expirationDate).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No polls found.</p>
        )}
      </div>
    </div>
  );
};

export default PollListPage;
