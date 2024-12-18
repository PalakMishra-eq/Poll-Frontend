import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Poll App</h1>
      <p className="text-lg text-gray-700 mb-8">
        Participate in polls, vote, and explore poll results!
      </p>
      <div className="flex space-x-4">
        <Button
          text="Login"
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-600"
        />
        <Button
          text="Signup"
          onClick={() => navigate("/signup")}
          className="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

export default LandingPage;
