import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/spacey-background.jpg';

type SortField = 'date' | 'amount' | 'status';
type SortDir = 'asc' | 'desc';

const initialExpenses = [
  { id: 1, date: '3/5/2026', amount: 100, description: 'Parts reimbursement.', status: 'COMPLETE', team: 'SEDS' },
  { id: 2, date: '3/5/2026', amount: 80, description: 'Parts reimbursement.', status: 'INCOMPLETE', team: 'NURover' },
  { id: 3, date: '3/1/2026', amount: 250, description: 'Tool purchase.', status: 'COMPLETE', team: 'SEDS' },
  { id: 4, date: '2/28/2026', amount: 45, description: 'Shipping costs.', status: 'INCOMPLETE', team: 'NURover' },
  { id: 5, date: '2/20/2026', amount: 300, description: 'Conference registration.', status: 'COMPLETE', team: 'SEDS' },
];

const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...initialExpenses].sort((a, b) => {
    let valA: any = a[sortField];
    let valB: any = b[sortField];
    if (sortField === 'date') { valA = new Date(valA); valB = new Date(valB); }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 text-gray-400">
      {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
    </span>
  );

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
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />

      <main className="relative z-10 h-full flex flex-col px-10 py-5 gap-4">

        {/* Top bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <img src="/seds-logo.png" alt="NU SEDS Logo" className="h-30 w-auto" />
          <div className="flex items-center gap-3 text-xl">
            <span className="text-gray-300">Welcome, <span className="text-white font-semibold">XXXX</span></span>
            <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center text-5xl">
              👤
            </div>
          </div>
        </div>

        {/* Balance cards */}
        <div className="flex gap-6 mt-50" style={{ height: '20%' }}>
          {[
            { label: 'SEDS Amount in account', amount: '$10,000' },
            { label: 'Rover Amount in account', amount: '$2,000' },
          ].map((card) => (
            <div
              key={card.label}
              className="flex-1 flex flex-col items-center justify-center rounded-2xl text-center gap-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
            >
              <p className="text-2xl text-gray-300">{card.label}</p>
              <p className="font-bold text-white" style={{ fontSize: '5rem' }}>{card.amount}</p>
            </div>
          ))}
        </div>

        {/* Expense table */}
        <div
          className="rounded-2xl flex flex-col overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}
        >
          {/* Table header */}
          <div className="grid grid-cols-4 px-8 py-8 border-b border-white/20 text-2xl font-semibold text-gray-300 tracking-widest">
            <button className="text-left hover:text-white transition" onClick={() => handleSort('date')}>
              DATE <SortIcon field="date" />
            </button>
            <button className="text-left hover:text-white transition" onClick={() => handleSort('amount')}>
              AMOUNT <SortIcon field="amount" />
            </button>
            <span>DESCRIPTION</span>
            <button className="text-left hover:text-white transition" onClick={() => handleSort('status')}>
              STATUS <SortIcon field="status" />
            </button>
          </div>

          {/* Rows */}
          <div className="flex flex-col">
            {sorted.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="grid grid-cols-4 px-8 py-8 text-2xl items-center transition hover:bg-white/5 cursor-pointer"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span className="text-gray-300">{expense.date}</span>
                <span className="text-white font-semibold">${expense.amount}</span>
                <span className="text-gray-300">{expense.description}</span>
                <span className={`font-bold tracking-wide ${expense.status === 'COMPLETE' ? 'text-blue-400' : 'text-red-500'}`}>
                  {expense.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* New Request button */}
        <div className="flex justify-center mt-10 pb-2">
          <button
            className="text-white text-3xl px-24 py-8 rounded-2xl hover:bg-white hover:text-black transition tracking-widest"
            style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
            onClick={() => navigate('/new-request')}
          >
            NEW REQUEST
          </button>
        </div>

      </main>
    </div>
  );
};

export default Expenses;