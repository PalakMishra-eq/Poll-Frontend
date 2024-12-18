import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import PollListPage from "../pages/PollListPage";
import RecoverAccountPage from "../pages/RecoverAccountPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignupPage from "../pages/SignupPage";
import UserProfilePage from "../pages/UserProfilePage";


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
      <Route path="/polls" element={<PollListPage />} />

    </Routes>
  );
};

export default AppRoutes;
