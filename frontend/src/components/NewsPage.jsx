import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard/news")
      .then((response) => {
        setNews(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(
          "There was an issue loading the news. Please try again later."
        );
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link
        to="/"
        className="text-blue-600 hover:text-blue-800 text-lg mb-6 inline-block"
      >
        &lt; Go Back
      </Link>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">News</h1>

      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <strong>Error: </strong>
          {error}
        </div>
      ) : (
        <ul className="space-y-6">
          {news.map((item) => (
            <li
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.headline}
              </h3>
              <p className="text-gray-700">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsPage;
