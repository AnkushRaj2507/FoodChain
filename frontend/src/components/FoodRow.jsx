import React from "react";

const FoodRow = ({ f, actions }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-[#f4f0ea] transition-all duration-200 ease-in-out">
      <td className="py-3 px-4 font-semibold text-gray-700">{f.messName}</td>
      <td className="py-3 px-4 text-gray-600">{f.foodDescription}</td>
      <td className="py-3 px-4 text-gray-600">{f.pickupAddress}</td>
      <td className="py-3 px-4 text-gray-600">{f.contactNumber}</td>
      
      {/* Status Badge */}
      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold 
            ${f.status === "available" ? "bg-green-100 text-green-700" : ""}
            ${f.status === "claimed" ? "bg-yellow-100 text-yellow-700" : ""}
            ${f.status === "collected" ? "bg-blue-100 text-blue-700" : ""}
            ${f.status === "expired" ? "bg-red-100 text-red-700" : ""}`}
        >
          {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
        </span>
      </td>

      {/* Action Buttons */}
      <td className="py-3 px-4">{actions}</td>
    </tr>
  );
};

export default FoodRow;
