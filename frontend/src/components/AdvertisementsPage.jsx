import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdvertisementsPage = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    axios
      .get("http://localhost:3000/dashboard/advertisements")
      .then((response) => {
        setAds(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
        setError(
          "There was an issue loading the advertisements. Please try again later."
        );
      });
  }, []);

  const statusCounts = ads.reduce(
    (acc, ad) => {
      acc[ad.status] = (acc[ad.status] || 0) + 1;
      return acc;
    },
    { published: 0, pending: 0, draft: 0 }
  );

  const data = {
    labels: ["Published", "Pending", "Draft"],
    datasets: [
      {
        label: "Advertisement Status",
        data: [
          statusCounts.published,
          statusCounts.pending,
          statusCounts.draft,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Link to="/" className="text-blue-600 text-lg mb-4 inline-block">
        &lt; Go Back
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Advertisements</h1>

      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          <strong>Error: </strong>
          {error}
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
          <div className="w-full h-[300px] flex justify-center">
            <Pie
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementsPage;
