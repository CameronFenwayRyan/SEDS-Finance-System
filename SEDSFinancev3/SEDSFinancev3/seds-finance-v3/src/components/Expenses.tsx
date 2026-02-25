import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";

// Import images from assets
import nestIcon from "../assets/team_logos/nest-logo.png";
import lunaboticsIcon from "../assets/team_logos/lunabotics-logo.png";
import suitsIcon from "../assets/team_logos/suits-logo.png";

const projectIcons: Record<string, string> = {
  NEST: nestIcon,
  Lunabotics: lunaboticsIcon,
  SUITS: suitsIcon,
};

const Expenses: React.FC = () => {
  const navigate = useNavigate();

  const expenses = [
    { id: 1, user: "me", requestor: "You", project: "NEST", name: "Rocket Engine Parts", amount: 320.5, date: "2025-02-10" },
    { id: 2, user: "me", requestor: "You", project: "Lunabotics", name: "Electronics & Wiring", amount: 145.99, date: "2025-02-12" },
    { id: 3, user: "other", requestor: "Alex Johnson", project: "SUITS", name: "Competition Registration", amount: 85.0, date: "2025-02-15" },
  ];

  const [showOthers, setShowOthers] = useState(false);
  const filteredExpenses = showOthers ? expenses : expenses.filter(e => e.user === "me");
  // **Run on page load**
  useEffect(() => {
    console.log("Expenses page loaded!");
  }, []); // Empty dependency array = run once on mount
  return (
    <div className="min-h-screen w-full bg-[#3d3f49] text-white flex flex-col">
      <TopBar username="User" directory="Expenses" />

      <main className="flex-grow w-full px-6 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Expenses</h1>

        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">

          {/* Title + Controls */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Expense List</h2>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={showOthers}
                  onChange={() => setShowOthers(!showOthers)}
                  className="h-4 w-4 rounded border-gray-500 bg-gray-700"
                />
                Display Others' Requests
              </label>

              <button
                onClick={() => navigate("/submit-expense")}
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded text-white"
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Table */}
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-300 text-center py-6">No expenses to display.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600 text-gray-300">
                  <th className="py-2"></th>
                  <th className="py-2 pr-6">ID</th>
                  <th className="py-2">Project</th>
                  <th className="py-2">Name</th>
                  {showOthers && <th className="py-2">Requestor</th>}
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>

              <tbody>
  {filteredExpenses.map((expense) => (
    <tr
      key={expense.id}
      className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition"
      onClick={() => navigate(`/expense/${expense.id}`)}
    >
      {/* Icon column */}
      <td className="py-3 px-2">
        <img
          src={projectIcons[expense.project]}
          alt={expense.project}
          className="w-12 h-12 "
        />
      </td>
      {/* Project name */}
      <td className="py-3 text-base font-medium">{100}</td>
      {/* Project name */}
      <td className="py-3 text-base font-medium">{expense.project}</td>

      {/* Expense name */}
      <td className="py-3">{expense.name}</td>

      {/* Requestor (conditionally shown) */}
      {showOthers && <td className="py-3">{expense.requestor}</td>}

      {/* Amount */}
      <td className="py-3">${expense.amount.toFixed(2)}</td>

      {/* Date */}
      <td className="py-3">{expense.date}</td>
    </tr>
  ))}
</tbody>

            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default Expenses;

