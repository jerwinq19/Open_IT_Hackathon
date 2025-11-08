import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Map from "./components/Map";

const App = () => {
  return (
    <div className="bg-gray-200 h-screen text-black font-[Inter] flex justify-center">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/"
          element={
            // <ProtectedRoutes>
            //   <MainPage />
            // </ProtectedRoutes>
              <MainPage />

          }
        />
      </Routes>
    </div>
  );
};

export default App;
