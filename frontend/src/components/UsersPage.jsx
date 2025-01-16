import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard/users")
      .then((response) => {
        setUsers(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(
          "There was an issue loading the users. Please try again later."
        );
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 text-lg mb-4 inline-block"
      >
        &lt; Go Back
      </Link>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Users</h1>

      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <strong>Error: </strong>
          {error}
        </div>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <p className="text-xl font-medium text-gray-700">
                {user.name} ({user.email})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
