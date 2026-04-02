// ─────────────────────────────────────────────────────────────────────────────
// AuthContext.tsx — Stores the logged-in user and token globally.
//
// HOW IT WORKS:
//   1. Wrap your app in <AuthProvider> (we'll do this in main.tsx)
//   2. Any component can call useAuth() to get the current user + token,
//      or call login() / logout()
//
// EXAMPLE USAGE IN A COMPONENT:
//   const { user, token, login, logout } = useAuth();
// ─────────────────────────────────────────────────────────────────────────────
 
import React, { createContext, useContext, useState } from 'react';
import type { User } from '../api';
 
// ─── Shape of the context ────────────────────────────────────────────────────
// This describes everything the context will expose to components.
 
interface AuthContextType {
  user: User | null;       // The logged-in user, or null if not logged in
  token: string | null;    // The auth token, or null if not logged in
  login: (user: User) => void;   // Call this after a successful sign-in
  logout: () => void;            // Call this to clear the session
}
 
// ─── Create the context ───────────────────────────────────────────────────────
// We start with null as a placeholder — AuthProvider will fill this in.
 
const AuthContext = createContext<AuthContextType | null>(null);
 
// ─── Provider component ───────────────────────────────────────────────────────
// This wraps your app and actually holds the state.
// Any component inside it can call useAuth() to access it.
 
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
 
  // Called by SignIn after a successful API response
  const login = (userData: User) => {
    setUser(userData);
    setToken(userData.token);
  };
 
  // Called by a logout button (we'll add one later)
  const logout = () => {
    setUser(null);
    setToken(null);
  };
 
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// ─── useAuth hook ─────────────────────────────────────────────────────────────
// This is what components actually call. It's just a cleaner way to use the context.
// If you accidentally call it outside of <AuthProvider>, it throws a clear error.
 
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
}