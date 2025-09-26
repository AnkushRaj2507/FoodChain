import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const FullLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

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
        Loading full leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
        <Navbar />
    <section className="py-10 mt-[70px] p-5 w-full bg-[#f0efec] border-white border-[6px] rounded-3xl text-center">
        {/* <Navbar /> */}
      <div className="text-3xl font-bold text-gray-800 mb-8">
        Complete Leaderboard
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white shadow-md">
            <tr className="text-center uppercase text-sm font-semibold tracking-normal">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Mess Name</th>
              <th className="py-3 px-4">Total Donations</th>
            </tr>
          </thead>

          <tbody>
            {leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-[#f4f0ea] transition-all duration-200 ease-in-out"
                >
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    #{index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {leader.messName}
                  </td>
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
    </section>
    </div>
  );
};

export default FullLeaderboard;
