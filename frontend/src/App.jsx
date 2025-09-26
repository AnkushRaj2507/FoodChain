import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import AddFood from "./pages/dashboard/AddFood.jsx";
import Donations from "./pages/dashboard/Donations.jsx";
import Pickups from "./pages/dashboard/Pickups.jsx";
import Admin from "./pages/dashboard/Admin.jsx";

import FullLeaderboard from "./pages/FullLeaderboard.jsx";



const App = () => {
  return (
    <div className="min-h-screen bg-[#ede4e1]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<FullLeaderboard />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="add-food" element={<AddFood />} />
          <Route path="donations" element={<Donations />} />
          <Route path="pickups" element={<Pickups />} />
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </div>
  )
}

export default App