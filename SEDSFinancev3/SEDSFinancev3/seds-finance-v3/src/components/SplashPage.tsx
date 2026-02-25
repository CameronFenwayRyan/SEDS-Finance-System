import React from 'react';
import TopBar from './TopBar';
import { useNavigate } from "react-router-dom";

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#3d3f49] text-white flex flex-col">
      <TopBar username="" directory=""/>
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 py-10 gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-center text-4xl lg:text-5xl font-bold mb-6">
            NU SEDS Finance System
          </h1>
          <p className="text-center text-gray-300 text-lg mb-8">
            Make Your Projects Possible!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-indigo-500 text-white px-6 py-3 rounded hover:bg-indigo-600 transition"
              onClick={() => navigate("/expenses")}
            >
              Sign In
            </button>
            <button className="bg-gray-800 text-indigo-400 border border-indigo-500 px-6 py-3 rounded hover:bg-gray-700 transition">
              Create Account
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/splash-image.png"
            alt="Splash"
            className="max-w-full h-auto rounded-lg shadow-lg border border-gray-700"
          />
        </div>
      </main>
    </div>
  );
};

export default SplashPage;
