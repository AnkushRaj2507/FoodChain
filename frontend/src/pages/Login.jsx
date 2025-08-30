import React, {useState} from 'react'
import { ShipWheelIcon, LogIn, LinkIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { Toaster, toast } from "react-hot-toast";

<Link />
const Login = () => {

    const [formData, setFormData]= useState({
        email: "", 
        password: "", 
    })

    const [error, setError]= useState("");
    const navigate= useNavigate();

    const handleChange= (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log("FormData:" , formData);
        try{
            const res= await API.post("/auth/login", formData);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            toast.success("Login successful");
            setTimeout(()=> navigate("/dashboard"), 1500);
        }catch(err){
            const errorMessage = err.response?.data?.message || "Login Failed";
            setError(errorMessage);
            toast.error(errorMessage); 
        }
    }


  return (
    <div className='min-h-screen text-black p-10 bg-[#e1dcd4]  w-full flex'>
        <Toaster position="top-right" reverseOrder={false} />
        <div className='p-5 w-full bg-[#f0ede7] border-white border-[6px] rounded-3xl flex'>
            <div className='w-full  lg:w-1/2 my-5  flex justify-center items-center'>
                <div>
                    <div className='flex mb-10'>
                        <h2 className='text-2xl  font-semibold mb-4'>Food</h2>
                        <LinkIcon className='mt-1'/>
                        <h2 className='text-2xl  font-semibold mb-4'>Chain</h2>
                    </div>

                    <h2 className='text-3xl mb-10 text-[#864b3c] font-bold'>Login</h2>
                    
                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* <div>
                            <h2 className="text-xl font-semibold">Welcome Back</h2>
                            <p className="text-sm opacity-70">
                                Sign in to your account to continue your language journey
                            </p>
                            </div> */}

                            <div className="flex flex-col gap-3">
                            <div className="form-control w-full space-y-2">
                                <label className="label">
                                <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                type="email"
                                name="email"
                                placeholder="hello@example.com"
                                className="input input-bordered w-full shadow-md rounded-full py-2 px-6"
                                  value={formData.email}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-2">
                                <label className="label">
                                <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="input input-bordered shadow-md w-full rounded-full py-2 px-6"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <button type="submit" className="mt-5 shadow-md w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#4d261c] to-[#b9917c]" >
                                Login
                            </button>

                            <div className="text-center mt-4">
                                <p className="text-sm">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-primary hover:underline">
                                    Create one
                                </Link>
                                </p>
                            </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='hidden lg:block lg:w-1/2 bg-cover bg-center rounded-3xl' style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661775322183-bf9d38cff431?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} >
                
            </div>
        </div>
    </div>
  )
}

export default Login