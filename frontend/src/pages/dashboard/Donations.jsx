import { useEffect, useMemo, useState } from "react";
import API from "../../api/axios.js";
import FoodRow from "../../components/FoodRow.jsx";
import { Toaster, toast } from "react-hot-toast";

export default function Donations() {
  const [list, setList] = useState([]);
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const load = async () => {
    try {
      const res = await API.get("/food");
      const mine = (res.data || []).filter(f => String(f.postedBy?._id || f.postedBy) === user.id);
      setList(mine);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    try {
      await API.delete(`/food/${id}`);
      toast.success("Deleted");
      await load();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4">My Donations</h2>
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
            {[...list] // Create a shallow copy to avoid mutating state
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (latest first)
              .map((f) => (
                <FoodRow
                  key={f._id}
                  f={f}
                  actions={
                    f.status === "available" ? (
                      <button
                        className="px-3 py-1 rounded-full text-xs font-semibold  bg-red-200 text-red-700 hover:bg-red-300 hover:shadow-sm transition"
                        onClick={() => remove(f._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-xs opacity-60">No actions</span>
                    )
                  }
                />
              ))}
            {list.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center opacity-60">
                  No donations yet
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
