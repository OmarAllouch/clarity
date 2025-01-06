import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* App Name */}
        <h1 className="text-2xl font-bold space-x-2 flex items-center cursor-pointer">
          <img src="/logo.svg" alt="Clarity Logo" className="h-8 w-8 inline" />
          <Link to="/todos">
            Clarity
          </Link>
        </h1>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/todos"
                className="hover:bg-gray-200 rounded px-2 py-1 transition-colors"
              >
                Todos
              </Link>
            </li>
            <li>
              <Link
                to="/notes"
                className="hover:bg-gray-200 rounded px-2 py-1 transition-colors"
              >
                Notes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
