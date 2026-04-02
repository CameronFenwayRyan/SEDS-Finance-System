import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/earth-background.jpg';
import { signIn } from '../api';
import { useAuth } from '../context/AuthContext';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [nuid, setNUID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);   // holds error message to display
  const [loading, setLoading] = useState(false);             // true while waiting for API

  const handleSignIn = async () => {
    // Clear any previous error
    setError(null);

    // Basic validation before even hitting the API
    if (!nuid || !password) {
      setError('Please enter your NUID and password.');
      return;
    }

    try {
      setLoading(true);
      const user = await signIn(nuid, password);  // calls GET /auth
      login(user);                                 // stores user + token in context
      navigate('/expenses');                       // only navigates on success
    } catch (err: any) {
      // err.message comes from apiFetch in api.ts — e.g. "Invalid token" or "Request failed (401)"
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Sign in form */}
      <main className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div
          className="flex flex-col items-center px-16 py-14 rounded-2xl w-[44rem]"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <h1 className="font-bold text-blue-500 mb-6 leading-none" style={{ fontSize: '7.5rem' }}>Sign In</h1>
          <p className="text-gray-400 text-3xl mb-10" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.1em' }}>
            Welcome back
          </p>

          <div className="flex flex-col gap-6 w-full">
            <input
              type="text"
              placeholder="NUID"
              value={nuid}
              onChange={(e) => setNUID(e.target.value)}
              className="bg-transparent border border-white text-white text-3xl px-8 py-6 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-white text-white text-3xl px-8 py-6 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
              // Allow pressing Enter to sign in
              onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
            />

            {/* Error message — only shows when there's an error */}
            {error && (
              <p className="text-red-400 text-xl text-center">{error}</p>
            )}

            <button
              className="border border-white text-white text-3xl px-12 py-6 rounded hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p
              className="text-gray-400 text-2xl text-center cursor-pointer hover:text-white transition"
              onClick={() => navigate('/create-account')}
            >
              Don't have an account? Create one
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;