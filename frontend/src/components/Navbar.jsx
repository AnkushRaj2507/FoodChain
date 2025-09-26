import { Link } from "react-router-dom";
import { ShipWheelIcon, LogIn, LinkIcon } from "lucide-react";


const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[#4d261c] to-[#b9917c] text-white px-6 py-3 shadow-md flex justify-between items-center h-[70px] fixed top-0 left-0 w-full z-50">
      {/* Logo / Home */}
      <Link to="/" className="">
        <div className='flex items-center justify-center'>
            <h2 className='text-2xl  font-semibold'>Food</h2>
            <LinkIcon className='mt-1'/>
            <h2 className='text-2xl  font-semibold'>Chain</h2>
        </div>
      </Link>

      {/* Menu
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/foods" className="hover:text-gray-200">Foods</Link>
        <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
      </div> */}

      <div className="flex items-center gap-6">
        <Link to="/login" className="text-xl font-semibold hover:text-gray-200">Login</Link>
        <Link to="/register" className="text-xl font-semibold hover:text-gray-200">Register</Link>
      </div>

      
    </nav>
  );
};

export default Navbar;
