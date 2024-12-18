// src/pages/ResetPasswordPage.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [resetToken, setResetToken] = useState(""); // State for reset token
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear previous error
    setSuccessMessage(""); // Clear previous success message

    try {
      // Call backend API to reset the password
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { token: resetToken, newPassword }
      );

      // Show success message and redirect to login
      setSuccessMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      // Handle errors
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Failed to reset password"
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <form
        onSubmit={handleResetPassword}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="resetToken"
          >
            Reset Token
          </label>
          <input
            type="text"
            id="resetToken"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the reset token"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your new password"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-xs italic">{successMessage}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
