import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import PollCreationPage from "../pages/PollCreationPage";
import PollListPage from "../pages/PollListPage";
import PollResultsPage from "../pages/PollResultsPage";
import VotePage from "../pages/PollVotePage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignupPage from "../pages/SignupPage";
import UserProfilePage from "../pages/UserProfilePage";
import VoteHistoryPage from "../pages/VoteHistoryPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/recover-account" element={<RecoverAccountPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
      <Route path="/poll-list" element={<ProtectedRoute><PollListPage /></ProtectedRoute>} />
      <Route path="/create-poll" element={<ProtectedRoute><PollCreationPage /></ProtectedRoute>} />
      <Route path="/vote/:pollId" element={<ProtectedRoute><VotePage /></ProtectedRoute>} />
      <Route path="/polls/:pollId/results" element={<ProtectedRoute><PollResultsPage /></ProtectedRoute>} />
      <Route path="/vote-history" element={<ProtectedRoute><VoteHistoryPage /></ProtectedRoute>} />

    </Routes>
  );
};

export default AppRoutes;
