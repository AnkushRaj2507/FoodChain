import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/food/leaderboard");
        setLeaders(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-lg font-semibold text-gray-600">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <section className="py-16 px-6 p-5 w-full bg-[#f0efec] border-white border-[6px] rounded-3xl text-center">
      <div className="text-3xl font-bold text-gray-800 mb-8">
        Our Leading Contributors
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white shadow-md">
            <tr className="text-center uppercase text-sm font-semibold tracking-normal">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Mess Name</th>
              <th className="py-3 px-4">Total Donations</th>
            </tr>
          </thead>

          <tbody>
            {leaders.length > 0 ? (
              leaders.slice(0, 10).map((leader, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-[#f4f0ea] transition-all duration-200 ease-in-out"
                >
                  {/* Rank */}
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    #{index + 1}
                  </td>

                  {/* Mess Name */}
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {leader.messName}
                  </td>

                  {/* Total Donations Badge */}
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow-sm">
                      {leader.totalDonations}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-6 text-gray-500 text-center font-medium"
                >
                  No contributions yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      <div className="mt-10">
        <button
            onClick={() => navigate("/leaderboard")}
            className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-200"
        >
            Show More →
        </button>
        </div>

    </section>
  );
};

export default Leaderboard;
