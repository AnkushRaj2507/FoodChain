import { Link } from "react-router-dom";
import { Users, Utensils, Shield, Heart, LinkIcon } from "lucide-react"; // icons
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx"
import Slideshow from "../components/Slideshow.jsx"

const Home = () => {



  return (
    <div className="font-sans">
        <Navbar />
      {/* Hero Section */}
      <div className=" bg-[#ede4e1] p-5 flex flex-col lg:flex-row">
        <section className="flex-1 lg:w-1/2 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20  text-[#4d261c]"> 
        <h1 className="text-5xl  font-bold mb-10"> "Turning Surplus Into Smiles - Donate Food, Feed Hope" </h1> 
        <p className="text-lg  max-w-2xl mb-10"> FoodChain is a platform that helps Messes donate surplus food, NGOs distribute it,
          and Admins manage everything — reducing waste and feeding the hungry. </p> 
        <div className="space-x-4"> <Link to="/register?role=mess" className="bg-white text-[#4d261c] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100" > Donate Food </Link> <Link to="/register?role=ngo" className="bg-[#4d261c] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#39140a]" > Join as NGO </Link> </div> 
        </section>
        <div className=" lg:block lg:w-1/2">
            <div className="w-full h-full min-h-screen p-5  rounded-3xl">
                <Slideshow />
            </div>
        </div>

      </div>

      {/* How It Works */}
      <section className="py-16 px-6 text-center bg-gray-50">
        <div className='flex justify-center text-center mb-5 text-3xl'>
            <h2 className='  font-bold mb-4'>How Food</h2>
            <LinkIcon className='mt-2 '/>
            <h2 className=' font-bold mb-4'>Chain Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-[#ede4e1] rounded-xl shadow-md">
            <Utensils className="mx-auto text-[#90594c] mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Mess</h3>
            <p>Upload details of surplus food quickly and easily.</p>
          </div>
          <div className="p-6 bg-[#ede4e1] rounded-xl shadow-md">
            <Users className="mx-auto text-[#a87d72] mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">NGO</h3>
            <p>Collect and distribute food to those in need.</p>
          </div>
          <div className="p-6 bg-[#ede4e1] rounded-xl shadow-md">
            <Shield className="mx-auto text-[#90594c]  mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Admin</h3>
            <p>Manage users, track activities, and ensure smooth operation.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-[#ede4e1]">
        <div className='flex justify-center text-center mb-5 text-3xl'>
            <h2 className='  font-bold mb-4'>Why Choose Food</h2>
            <LinkIcon className='mt-2 '/>
            <h2 className=' font-bold mb-4'>Chain?</h2>
        </div>
        <div className="grid text-white md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 shadow-md rounded-xl bg-gradient-to-r from-[#4d261c] to-[#b9917c]">
            <h3 className="text-xl font-semibold mb-2">Reduce Food Waste</h3>
            <p>Every meal counts. We ensure surplus food reaches those in need instead of landfills.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl bg-gradient-to-r from-[#4d261c] to-[#b9917c]">
            <h3 className="text-xl font-semibold mb-2"> Simple & Fast</h3>
            <p>Our platform is designed to make food donation and distribution quick and hassle-free.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl bg-gradient-to-r from-[#4d261c] to-[#b9917c]">
            <h3 className="text-xl font-semibold mb-2"> Secure & Reliable</h3>
            <p>Role-based access ensures smooth and safe operations for Mess, NGO, and Admin.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl bg-gradient-to-r from-[#4d261c] to-[#b9917c]">
            <h3 className="text-xl font-semibold mb-2"> Make an Impact</h3>
            <p>Join hands with others to fight hunger and build a better community.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold text-green-600">1,000+</h3>
            <p>Meals Saved</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">50+</h3>
            <p>Messes Connected</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-purple-600">20+</h3>
            <p>NGOs Partnered</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-black px-6  text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Change</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Join FoodChain today and help reduce food waste while feeding the hungry.
        </p>
        <Link
          to="/register"
          className="bg-white text-[#4d261c] font-semibold px-6 py-3 rounded-full shadow hover:bg-gradient-to-r from-[#4d261c] to-[#b9917c] hover:text-white transition"
        >
          Register Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#4d261c] via-[#b9917c] to-[#4d261c] text-black py-6 text-center">
        <p>© {new Date().getFullYear()} FoodChain. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
