import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to the Dashboard
      </h1>
      <nav className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <ul className="space-y-4">
          <li>
            <Link
              to="/users"
              className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/advertisements"
              className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
            >
              Advertisements
            </Link>
          </li>
          <li>
            <Link
              to="/news"
              className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
            >
              News
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
