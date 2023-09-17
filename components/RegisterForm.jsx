"use client";

import Image from 'next/image'
import imgs from '../public/imgs.png'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          email,

        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-24 bg-gray-100">

    <main className="flex flex-col items-center justify-ceter w-full flex-1 px-20 text-center">
      <div className="bg-white  shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-4/5 p-10">
          <div className="text-left front-bold">
            <span className="text-blue-500" >RAK</span>Bank
          </div>
          <div className="py-10">
            <h2 className="text-xl font-bold  mb-2">Welcome to RAK Bank</h2>
            <p className=" mb-2">Get's Started - it's free No Credit Card Needed!</p>
            <div className="flex justify-center py-10">
              <a href="#" className="border-2 rounded-full px-12 py-2  font-semibold mr-1">Continue With Google</a>
            </div>
            <div className="para">
              <p >Or</p>
              <br></br>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="name@company.com"
              />

              <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
                Continue
              </button>

              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <Link className="text-sm mt-3 text-center" href={"/"}>
                Already have an account? <span className="text-blue-500">Login</span>
              </Link>
            </form>
          </div>
        </div>
        <div className="w-4/5 bg-blue-500 text-white py-36 px-12">
          <img src="imgs.png" ></img>
        </div>
      </div>
    </main>
    </div>

  );
}
