import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Map from "./components/Map";
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className="bg-gray-200 h-screen text-black font-[Inter] flex justify-center">
      <Toaster position="top-center" reverseOrder={false}/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map" element={<Map />} />
        <Route
          path="/main"
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
