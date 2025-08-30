import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios.js";
import StatsCard from "../../components/StatsCard.jsx";
import { Link } from "react-router-dom";
import { LinkIcon, LogOut, PlusCircle, LayoutDashboard, ShoppingBasket, Truck, Shield } from "lucide-react";


export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState([]);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/food");
        setFood(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const minePosted = food.filter(f => String(f.postedBy?._id || f.postedBy) === user.id);
  const available = food.filter(f => f.status === "available");
const claimedByMe = food.filter(f => {
  const ngoId = typeof f.ngoAssigned === "object" ? f.ngoAssigned?._id : f.ngoAssigned;
  return String(ngoId) === String(user.id);
});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="opacity-70">Here’s what’s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {user.role === "mess" && (
          <>
            <StatsCard title="My Donations (total)" value={minePosted.length} />
            <StatsCard title="Awaiting NGO (available)" value={minePosted.filter(f => f.status === "available").length} />
            <StatsCard title="Claimed / Collected" value={`${minePosted.filter(f => f.status !== "available").length}`} />
          </>
        )}

        {user.role === "ngo" && (
          <>
            <StatsCard title="Available Nearby" value={available.length} />
            <StatsCard title="My Active Pickups" value={claimedByMe.filter(f => f.status === "claimed").length} />
            <StatsCard title="Completed" value={claimedByMe.filter(f => f.status === "collected").length} />
          </>
        )}

        {user.role === "admin" && (
          <>
            <StatsCard title="Total Food Posts" value={food.length} />
            <StatsCard title="Available" value={available.length} />
            <StatsCard title="Claimed/Collected" value={food.filter(f => f.status !== "available").length} />
          </>
        )}
      </div>

      {/* Quick links */}
      <div className="">
        {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2> */}
        <div className="flex flex-wrap gap-3">
          {user.role === "mess" && (
            <>
              <Link
                to="/dashboard/add-food"
                className="px-5 py-2 flex rounded-lg font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#4d261c] to-[#b9917c] hover:opacity-90"
              >
                <PlusCircle size={18} className="mt-1 mr-2" /> Add Food
              </Link>
              <Link
                to="/dashboard/donations"
                className="px-5 py-2 flex rounded-lg font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#4d261c] to-[#b9917c] hover:opacity-90"
              >
                <ShoppingBasket size={18} className="mt-1 mr-2" /> My Donations
              </Link>
            </>
          )}

          {user.role === "ngo" && (
            <Link
              to="/dashboard/pickups"
              className="px-5 py-2 flex rounded-lg font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#4d261c] to-[#b9917c] hover:opacity-90"
            >
              <Truck size={18} className="mt-1 mr-2" /> Pickups
            </Link>
          )}

          {user.role === "admin" && (
            <Link
              to="/dashboard/admin"
              className="px-5 py-2 rounded-lg font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-[#4d261c] to-[#b9917c] hover:opacity-90"
            >
            Admin Panel
            </Link>
          )}
        </div>
      </div>

      {loading && <div>Loading...</div>}
    </div>
  );
}
