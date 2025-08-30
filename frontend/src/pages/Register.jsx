import {useState} from 'react'
import { LinkIcon } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios.js";


const Register = () => {

    const [formData, setFormData]= useState({
        name: "", 
        email: "", 
        password: "", 
        role: "",
        contactNumber: "",
        location: "",
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
            const res= await API.post("/auth/register", formData);
            localStorage.setItem("token", res.data.token);
            toast.success("Registration successful");
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
            <div className='w-full  lg:w-1/2 my-5   flex justify-center items-center'>
                <div>
                    <div className='flex mb-10'>
                        <h2 className='text-2xl  font-semibold mb-4'>Food</h2>
                        <LinkIcon className='mt-1'/>
                        <h2 className='text-2xl  font-semibold mb-4'>Chain</h2>
                    </div>

                    <h2 className='text-3xl mb-5 text-[#864b3c] font-bold'>Create Account</h2>
                    
                    <div className="w-full">
                        <form 
                        onSubmit={handleSubmit}>
                        {/* {error && <p className="text-red-500">{error}</p>} */}
                        <div className="space-y-2">
                            {/* <div>
                            <h2 className="text-xl font-semibold">Welcome Back</h2>
                            <p className="text-sm opacity-70">
                                Sign in to your account to continue your language journey
                            </p>
                            </div> */}

                            <div className="flex flex-col gap-2">
                            <div className="form-control w-full space-y-1">
                                <label className="label">
                                <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                type="name"
                                name="name"
                                placeholder="XYZ"
                                className="input input-bordered w-full shadow-md rounded-full py-2 px-6"
                                  value={formData.name}
                                  onChange={handleChange }
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-1">
                                <label className="label">
                                <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                type="email"
                                name="email"
                                placeholder="hello@example.com"
                                className="input input-bordered w-full shadow-md rounded-full py-2 px-6"
                                value={formData.email}
                                  onChange={handleChange }
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-1">
                                <label className="label">
                                <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="input input-bordered shadow-md w-full rounded-full py-2 px-6"
                                value={formData.password}
                                  onChange={handleChange }
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-1">
                                <label className="label">
                                <span className="label-text font-semibold">Contact Number</span>
                                </label>
                                <input
                                type="tel"
                                name="contactNumber"
                                placeholder="+91 9872305676"
                                className="input input-bordered w-full shadow-md rounded-full py-2 px-6"
                                value={formData.contactNumber}
                                  onChange={handleChange }
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-1">
                                <label className="label">
                                <span className="label-text font-semibold">Location</span>
                                </label>
                                <input
                                type="text"
                                name="location"
                                placeholder="Enter your city"
                                className="input input-bordered w-full shadow-md rounded-full py-2 px-6"
                                value={formData.location}
                                  onChange={handleChange }
                                required
                                />
                            </div>

                            <div className="form-control w-full space-y-1">
                            <label className="label">
                                <span className="label-text font-semibold">Role</span>
                            </label>
                            <select
                                name="role"
                                className="select select-bordered w-full shadow-md rounded-full py-2 px-6"
                                value={formData.role}   // binds to state
                                onChange={handleChange}
                                required
                            >
                                <option className='text-gray-500' value="" disabled >
                                Select your role
                                </option>
                                <option value="mess">Mess</option>
                                <option value="ngo">NGO</option>
                                {/* <option value="admin">Admin</option> */}
                            </select>
                            </div>


                            <button type="submit" className="mt-5 shadow-md w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#4d261c] to-[#b9917c]" >
                                Register
                            </button>

                            
                            </div>
                        </div>
                        </form>

                        <div className="text-center mt-4">
                            <p className="text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Login
                            </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden lg:block lg:w-1/2 bg-cover bg-center rounded-3xl' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1601586967241-8ed4b5159734?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGRvbmF0aW9ufGVufDB8MXwwfHx8MA%3D%3D')" }} >
                
            </div>
        </div>
    </div>
  )
}

export default Register

