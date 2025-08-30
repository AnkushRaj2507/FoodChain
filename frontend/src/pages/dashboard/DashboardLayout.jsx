import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { LinkIcon, LogOut, PlusCircle, LayoutDashboard, ShoppingBasket, Truck, Shield } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); } catch { return {}; }
  }, []);

  useEffect(() => {
    if (!user?.role) navigate("/login");
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const nav = [
    { to: "/dashboard", label: "Overview", icon: <LayoutDashboard size={18} /> },
    ...(user.role === "mess" ? [
      { to: "/dashboard/add-food", label: "Add Food", icon: <PlusCircle size={18} /> },
      { to: "/dashboard/donations", label: "My Donations", icon: <ShoppingBasket size={18} /> },
    ] : []),
    ...(user.role === "ngo" ? [
      { to: "/dashboard/pickups", label: "Pickups", icon: <Truck size={18} /> },
    ] : []),
    ...(user.role === "admin" ? [
      { to: "/dashboard/admin", label: "Admin", icon: <Shield size={18} /> },
    ] : []),
  ];

  return (
    <div className="min-h-screen w-full bg-[#f6f5f2]">
      <div className="flex">
        {/* sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r">
          <div className="p-5 border-b">
            <div className='flex'>
              <h2 className='text-2xl  font-bold '>Food</h2>
              <LinkIcon className='mt-1'/>
              <h2 className='text-2xl  font-bold '>Chain</h2>
            </div>
            {/* <div className="font-bold text-xl">FoodChain</div> */}
            <div className="text-sm opacity-70">Hi, {user?.name || "User"} ({user?.role})</div>
          </div>
          <nav className="p-4 space-y-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg ${isActive ? "bg-[#efeae3] font-semibold" : "hover:bg-[#f4f0ea]"}`
                }
              >
                {n.icon} <span>{n.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="p-4 mt-auto">
            <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#421e15] to-[#b9917c] text-white rounded-lg py-2">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* main */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
