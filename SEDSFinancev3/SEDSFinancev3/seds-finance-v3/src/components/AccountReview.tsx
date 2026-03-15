import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/earth-background.jpg';

const AccountReview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Exo 2', sans-serif"
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95), transparent)' }} />

      {/* Top-left logo */}
      <div className="absolute top-4 left-4 z-10">
        <img src="/seds-logo.png" alt="NU SEDS Logo" className="h-30 w-auto" />
      </div>

      {/* Content */}
      <main className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div
          className="flex flex-col items-center text-center px-16 py-14 rounded-2xl w-[44rem] gap-6"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span className="text-6xl">🚀</span>
          <h1 className="font-bold text-blue-500 leading-none" style={{ fontSize: '4rem' }}>Request Submitted</h1>
          <p className="text-gray-400 text-2xl" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.1em' }}>
            Your account is pending review
          </p>
          <p className="text-gray-300 text-xl leading-relaxed">
            A SEDS admin will review your request shortly. You'll be notified once your account has been approved.
          </p>
          <button
            className="border border-white text-white text-xl px-12 py-4 rounded hover:bg-white hover:text-black transition mt-4"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default AccountReview;