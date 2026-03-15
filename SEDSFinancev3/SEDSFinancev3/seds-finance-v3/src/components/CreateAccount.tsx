import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/earth-background.jpg';

const SEDS_TEAMS = ['NURover', 'NU Astronomy', 'NU SUITS', 'NU Lunabotics', 'COBRA', 'NEST'];

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setNUID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleTeam = (team: string) => {
    setSelectedTeams(prev =>
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
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

      {/* Create account form */}
      <main className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div
          className="flex flex-col items-center px-16 py-14 rounded-2xl w-[44rem]"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <h1 className="font-bold text-blue-500 mb-6 leading-none" style={{ fontSize: '5rem' }}>Create Account</h1>
          <p className="text-gray-400 text-3xl mb-10" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.1em' }}>
            Join the mission
          </p>

          <div className="flex flex-col gap-6 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white text-white text-2xl px-8 py-5 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="NUID"
              value={username}
              onChange={(e) => setNUID(e.target.value)}
              className="bg-transparent border border-white text-white text-2xl px-8 py-5 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-white text-white text-2xl px-8 py-5 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border border-white text-white text-2xl px-8 py-5 rounded placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />

            {/* SEDS Team Dropdown */}
            <div className="relative">
              <button
                className="w-full border border-white text-left text-2xl px-8 py-5 rounded focus:outline-none focus:border-blue-500"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedTeams.length === 0
                  ? <span className="text-gray-400">Select SEDS Team(s)</span>
                  : <span className="text-white">{selectedTeams.join(', ')}</span>
                }
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute w-full mt-2 rounded-xl z-20 overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
                >
                  {SEDS_TEAMS.map(team => (
                    <div
                      key={team}
                      className="flex items-center gap-4 px-8 py-4 cursor-pointer hover:bg-white/10 transition text-2xl"
                      onClick={() => toggleTeam(team)}
                    >
                      <span className={`w-5 h-5 rounded border flex items-center justify-center ${selectedTeams.includes(team) ? 'bg-blue-500 border-blue-500' : 'border-white'}`}>
                        {selectedTeams.includes(team) && <span className="text-white text-sm">✓</span>}
                      </span>
                      {team}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              className="border border-white text-white text-2xl px-12 py-5 rounded hover:bg-white hover:text-black transition"
              onClick={() => navigate('/account-review')}
            >
              Create Account
            </button>
            <p
              className="text-gray-400 text-xl text-center cursor-pointer hover:text-white transition"
              onClick={() => navigate('/sign-in')}
            >
              Already have an account? Sign in
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateAccount;