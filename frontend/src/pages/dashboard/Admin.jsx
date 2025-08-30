import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import { Toaster, toast } from "react-hot-toast";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [food, setFood] = useState([]);

  const load = async () => {
    try {
      const [u, f] = await Promise.all([
        API.get("/admin/users"),
        API.get("/food"),
      ]);
      setUsers(u.data || []);
      setFood(f.data || []);
    } catch (e) {
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => { load(); }, []);

  const delUser = async (id) => {
    try {
      await API.delete(`/admin/users/${id}`);
      toast.success("User deleted");
      await load();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <Toaster position="top-right" reverseOrder={false} />
      <section>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Name</th><th className="py-2">Email</th>
                <th className="py-2">Role</th><th className="py-2">Contact</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2">{u.contactNumber || "-"}</td>
                  <td className="py-2">
                    <button className="btn btn-xs" onClick={() => delUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan="5" className="py-4 text-center opacity-60">No users</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">All Food Donations</h2>
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Mess</th><th className="py-2">Description</th>
                <th className="py-2">Address</th><th className="py-2">Contact</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {food.map(f => (
                <tr key={f._id} className="border-b">
                  <td className="py-2">{f.messName}</td>
                  <td className="py-2">{f.foodDescription}</td>
                  <td className="py-2">{f.pickupAddress}</td>
                  <td className="py-2">{f.contactNumber}</td>
                  <td className="py-2">{f.status}</td>
                </tr>
              ))}
              {food.length === 0 && <tr><td colSpan="5" className="py-4 text-center opacity-60">No food posts</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
