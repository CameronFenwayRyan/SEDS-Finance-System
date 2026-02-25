import React from "react";

interface TopBarProps {
  username?: string;
  directory?: string;
}

export default class TopBar extends React.Component<TopBarProps> {
  constructor(props: TopBarProps) {
    super(props);
  }
  

  render() {
    const labels = ["Expenses", "New Expense", "Accounts", "Open Items"];
    const { username, directory } = this.props;

    return (
      <header className="w-full flex items-center justify-between bg-[#06203b] px-6 py-4 shadow-md">
        {/* Left side — Logo */}
        <img
          src="/nu-seds.png"
          alt="NU SEDS"
          className="w-10 h-10 rounded object-cover object-center"
        />

        {/* Center — clickable text labels (conditionally rendered) */}
        {username !== "" && (
            <div className="flex-1 flex justify-center gap-6 text-white text-lg font-semibold cursor-pointer">
                {labels.map((label) => (
                <span
                    key={label}
                    className={`hover:text-indigo-400 transition ${
                    label === this.props.directory ? "underline" : ""
                    }`}
                >
                    {label}
                </span>
                ))}
            </div>
            )}

        {/* Right side — profile image and welcome text */}
        <div className="flex items-center gap-3">
            {username && username !== "" ? (
            <span className="text-white font-semibold text-2xl">
              Welcome, {username}
            </span>
            ) : (
                <span className="text-white font-semibold text-2xl cursor-pointer hover:text-indigo-400">
                Sign In
                </span>
            )}
          <img
            src="/profile-icon.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          
        </div>
      </header>
    );
  }
}
