import { useState } from "react";
import API from "../../api/axios.js";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddFood() {
  const [form, setForm] = useState({
    messName: "",
    foodDescription: "",
    pickupAddress: "",
    contactNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/food", form);
      toast.success("Food posted!");
      navigate("/dashboard/donations");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-bold mb-4">Add Surplus Food</h2>
      <form
        onSubmit={onSubmit}
        className="space-y-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-md max-w-lg mx-auto"
      >
        {/* Mess Name */}
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:bg-[#f4f0ea] transition duration-200 text-gray-800 placeholder-gray-400"
          name="messName"
          placeholder="Mess / Restaurant Name"
          value={form.messName}
          onChange={onChange}
          required
        />

        {/* Food Description */}
        <textarea
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:bg-[#f4f0ea] transition duration-200 text-gray-800 placeholder-gray-400 resize-none"
          name="foodDescription"
          rows="3"
          placeholder="Description & Approx Quantity"
          value={form.foodDescription}
          onChange={onChange}
          required
        />

        {/* Pickup Address */}
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:bg-[#f4f0ea] transition duration-200 text-gray-800 placeholder-gray-400"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={form.pickupAddress}
          onChange={onChange}
          required
        />

        {/* Contact Number */}
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none   focus:bg-[#f4f0ea] transition duration-200 text-gray-800 placeholder-gray-400"
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={onChange}
          required
        />

        {/* Submit Button */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            loading
              ? "bg-[#f4f0ea] cursor-not-allowed"
              : "bg-gradient-to-r from-[#4d261c] to-[#b9917c]  text-white"
          }`}
        >
          {loading ? "Saving..." : "Post Food"}
        </button>
      </form>


    </div>
  );
}
