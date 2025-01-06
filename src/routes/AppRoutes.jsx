import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Route path="/home" element={<HomePage />} />
      <Route path="/recover-account" element={<RecoverAccountPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/poll-list" element={<PollListPage />} />
      <Route path="/create-poll" element={<PollCreationPage />} />
      <Route path="/vote/:pollId" element={<VotePage />} />
      <Route path="/polls/results/:pollId" element={<PollResultsPage />} />
      <Route path="/vote-history" element={<VoteHistoryPage />} />
      

    </Routes>
  );
};

export default AppRoutes;
