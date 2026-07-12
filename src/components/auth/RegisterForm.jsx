"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import {
  FaGoogle,
  FaHandsHelping,
  FaRocket,
  FaUser,
} from "react-icons/fa";

import PasswordInput from "./PasswordInput";
import { MdEmail } from "react-icons/md";
import { FiImage } from "react-icons/fi";
import RoleCard from "./RoleCard";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState("supporter");
  const router = useRouter(); 

 
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log("User Input Details:", user);

    if (user?.password !== user?.confirmPassword) {
      return toast.error("Passwords do not match!");
      
    }
    let credit;
    if(user?.role=="supporter"){
      credit=50;
    }
    else if(user?.role=="creator"){
      credit=20;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || "", 
      role: user?.role,
      credit:credit,
      });

      // console.log("Response Data:", data);
      // console.log("Response Error:", error);

      if (error) {
        return toast.error(error.message || "Registration failed");
      }

      if (data) {
        toast.success("Registration Successful");
        router.push("/");
      }
    } catch (err) {
      console.error("Catch Block Error:", err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.08)]">

      <form onSubmit={handleRegister} className="space-y-5">

        {/* Name */}

        <div>
          <label className="mb-2 block font-medium text-[#244034]">
            Full Name
          </label>

          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-11 pr-4 outline-none transition focus:border-[#4F8A6A]"
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium text-[#244034]">
            Email Address
          </label>

          <div className="relative">
            <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-11 pr-4 outline-none transition focus:border-[#4F8A6A]"
            />
          </div>
        </div>

        {/* Photo URL */}

        <div>
          <label className="mb-2 block font-medium text-[#244034]">
            Photo URL
          </label>

          <div className="relative">
            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              name="image"
              placeholder="https://example.com/photo.jpg"
              className="h-12 w-full rounded-xl border border-[#ECE7DE] pl-11 pr-4 outline-none transition focus:border-[#4F8A6A]"
            />
          </div>
        </div>

<PasswordInput
  label="Password"
  name="password"
  placeholder="Create a strong password"
  showStrength
/>

<PasswordInput
  label="Confirm Password"
  name="confirmPassword"
  placeholder="Confirm your password"
/>

        {/* Role */}

   <div>
  <label className="mb-3 block text-sm font-semibold text-[#244034]">
    Join As
  </label>

  <input
    type="hidden"
    name="role"
    value={selectedRole}
  />

  <div className="grid gap-4 md:grid-cols-2">
    <RoleCard
      title="Supporter"
      description="Discover campaigns and support creators with your credits."
      value="supporter"
      icon={<FaHandsHelping />}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
    />

    <RoleCard
      title="Creator"
      description="Launch campaigns, raise funds, and bring your ideas to life."
      value="creator"
      icon={<FaRocket />}
      selectedRole={selectedRole}
      setSelectedRole={setSelectedRole}
    />
  </div>
</div>

        {/* Submit */}

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#4F8A6A] font-semibold text-white transition hover:bg-[#3E7258]"
        >
          Create Account
        </button>

        {/* Divider */}

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#ECE7DE]" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-[#ECE7DE]" />
        </div>

        {/* Google */}

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#ECE7DE] font-medium transition hover:bg-gray-50"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* Login */}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#4F8A6A] hover:underline"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}