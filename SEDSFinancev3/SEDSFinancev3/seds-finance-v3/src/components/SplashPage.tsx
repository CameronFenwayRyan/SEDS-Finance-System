import React from 'react';
import { useNavigate } from "react-router-dom";
import jupiter from '../assets/jupiter.png';
import bg from '../assets/earth-background.jpg';
const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Exo 2', sans-serif"
      }}
    >

      {/* Top-left logo */}
      <div className="absolute top-4 left-4 z-10">
        <img src="/seds-logo.png" alt="NU SEDS Logo" className="h-30 w-auto" />
      </div>

      {/* Dark overlay panel - left side */}
      <div className="absolute inset-y-0 left-0 w-8/10" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95), transparent)' }} />

      {/* Main content - left side */}
      <main className="absolute inset-0 flex flex-col justify-center px-16 w-full lg:w-1/2">
        <h1 className="font-bold text-blue-500 mb-0 leading-none" style={{ fontSize: '10rem' }}>NU SEDS</h1>
        <h2 className="font-semibold text-red-500 mb-10 text-8xl leading-none">Finance System</h2>
        <p className="text-5xl italic mb-15" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 550, letterSpacing: '0.1em' }}>
          Build beyond limits
        </p>

        <div className="flex flex-col gap-4 w-200">
          <button
            className="border border-white text-white text-4xl px-16 py-10 rounded hover:bg-white hover:text-black transition"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </button>
          <button
            className="border border-white text-white text-4xl px-16 py-10 rounded hover:bg-white hover:text-black transition"
            onClick={() => navigate("/create-account")}
          >
            Create Account
          </button>
        </div>
      </main>

    </div>
  );
};

export default SplashPage;
