"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className=" p-5 rounded-lg">
        <h1 className="text-xl font-bold my-4 text-center">Login into your account</h1>

        <p className="text-center my-2">Enter your Work email address</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="name@company.com"
          />
         
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Next
          </button>

  
          <p className="text-center my-2">Or sign in with</p>

          <button className="bg-gray shadow-lg rounded-lg border-t-4  text-black  cursor-pointer py-2">
            Google
          </button>

          
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
           <Link className="text-sm mt-5 text-center" href={"/register"}>
            Don't have an account? <span className="text-blue-600">Sign Up</span>
          </Link>

          <Link className="text-sm  text-center" href={"/register"}>
            Can't log in? <span className="text-blue-600">Visit our help center</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
