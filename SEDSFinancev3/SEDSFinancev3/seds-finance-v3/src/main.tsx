import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import SplashPage from './components/SplashPage';
import CreateAccount from './components/CreateAccount';
import SignIn from './components/SignIn';
import AccountReview from './components/AccountReview';
import Expenses from './components/Expenses';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>  
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/account-review" element={<AccountReview />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter> 
  </StrictMode>
);
