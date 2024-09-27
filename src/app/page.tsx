"use client";
import { useContext } from "react";
import { AuthContext } from "@/contextprovider/Contextprovider";
import { useRouter } from "next/navigation";
import { getCookie } from "@/cookies/Cookie";

export default function Home() {
  const { name } = useContext(AuthContext);
  const token = getCookie("token")

  const router = useRouter()
  return (
    <div className="h-screen bg-gradient-to-r from-gray-950 to-gray-800 flex max-sm:flex-col-reverse">
      {/* Left Section - Welcome Text */}
      <div className="flex-1 flex flex-col justify-center items-start p-10 text-white">
        <h1 className="max-sm:text-3xl text-6xl font-extrabold mb-6 leading-tight">
          Welcome to <br /> Task <span className="text-blue-700">Manager</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10">
          Manage your projects, maintain your project, and track progress – all
          in one place.
        </p>

        {/* Call to Action Button */}
        <button
          className="bg-indigo-700 hover:bg-indigo-600 text-white font-semibold py-3 px-10 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          aria-label="Get Started"
          onClick={()=>{
            if(token)
              router.push("/tasks")
            else
              router.push("/signin")
          }}
        >
          Get Started
        </button>
      </div>

      {/* Right Section - Illustration or Image */}
      <div className="flex-1 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
          aria-label="Background video showcasing the Project Planner"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

     
    </div>
  );
}
