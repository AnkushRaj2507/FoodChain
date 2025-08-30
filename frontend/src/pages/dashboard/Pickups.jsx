import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios.js";
import FoodRow from "../../components/FoodRow.jsx";
import { Toaster, toast } from "react-hot-toast";

export default function Pickups() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  // ✅ Fetch all food items
  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get("/food");
      setList(res.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ✅ Claim donation
  const claim = async (id) => {
  try {
    // Call API and get the updated food object
    const res = await API.put(`/food/${id}/claim`);

    // Update the list immutably
    setList((prevList) =>
      prevList.map((f) =>
        f._id === id
          ? { ...f, ...res.data } // merge backend data with existing food
          : f
      )
    );

    toast.success("Food successfully claimed!");
  } catch (e) {
    toast.error(e.response?.data?.message || "Claim failed");
  }
};



  // ✅ Mark donation as collected
  const complete = async (id) => {
    try {
      // Call API and get the updated food object
    const res = await API.put(`/food/${id}/collected`);

    // Update the list immutably
    setList((prevList) =>
      prevList.map((f) =>
        f._id === id
          ? { ...f, ...res.data } // merge backend data with existing food
          : f
      )
    );
      toast.success("Food successfully collected!");
      await load();
    } catch (e) {
      toast.error("Failed to mark as collected");
    }
  };

  // ✅ Filter food lists
  const available = list.filter(f => f.status === "available");
  // const mineActive = list.filter(f => f.status === "claimed");
  const mineActive = list.filter(
    f => f.status === "claimed" && String(f.ngoAssigned?._id || f.ngoAssigned) === String(user.id)
  );

  const mineCompleted = list.filter(
    f => f.status === "collected" && String(f.ngoAssigned?._id || f.ngoAssigned) === String(user.id)
  );


  return (
    <div className="space-y-8 w-auto">
      <Toaster position="top-right" reverseOrder={false} />

      {/* AVAILABLE DONATIONS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Available Donations</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white shadow-md">
              <tr className="text-left uppercase text-sm font-semibold tracking-normal">
                <th className="py-3 px-4">Mess</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {available.map((f) => (
                <FoodRow
                  key={f._id}
                  f={f}
                  actions={
                    <button
                      className="px-3 py-1 rounded-full text-xs font-semibold  bg-yellow-100 text-yellow-700 hover:bg-yellow-300 hover:shadow-sm transition"
                      onClick={() => claim(f._id)}
                    >
                      Claim
                    </button>
                  }
                />
              ))}
              {available.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-center opacity-60">
                    No available donations right now
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ACTIVE PICKUPS */}
      <section>
        <h2 className="text-xl font-bold mb-4">My Active Pickups</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white shadow-md">
              <tr className="text-left uppercase text-sm font-semibold tracking-normal">
                <th className="py-3 px-4">Mess</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...mineActive].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((f) => (                
                <FoodRow
                  key={f._id}
                  f={f}
                  actions={
                    <button
                      className="px-3 py-1 rounded-full text-xs font-semibold  bg-green-100 text-green-700 hover:bg-green-300 hover:shadow-sm transition"
                      onClick={() => complete(f._id)}
                    >
                      Mark Collected
                    </button>
                  }
                />
              ))}
              {mineActive.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-center opacity-60">
                    No active pickups
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* COMPLETED PICKUPS */}
      <section>
        <h2 className="text-xl font-bold mb-4">Completed Pickups</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white shadow-md">
              <tr className="text-left uppercase text-sm font-semibold tracking-normal">
                <th className="py-3 px-4">Mess</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...mineCompleted].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((f) => (
                <FoodRow
                  key={f._id}
                  f={f}
                  actions={<span className="text-xs opacity-60">Completed</span>}
                />
              ))}
              {mineCompleted.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-center opacity-60">
                    No completed pickups yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {loading && <div className="text-center py-4">Loading...</div>}
    </div>
  );
}
