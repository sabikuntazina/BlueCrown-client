"use client";

import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import PasswordInput from "./PasswordInput";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Welcome to Life Atlas");
        router.push("/");
        router.refresh(); // সেশন স্টেট আপডেট করার জন্য
      }

      if (error) {
        toast.error(error.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // গুগল দিয়ে লগইন
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // লগইন সফল হলে যেখানে রিডাইরেক্ট হবে
      });
    } catch (err) {
      console.error(err);
      toast.error("Google authentication failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#ECE7DE] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,.08)]">
      <form onSubmit={handleLogin} className="space-y-5">
        
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

        {/* Password */}
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
        />

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#4F8A6A] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-[#4F8A6A] font-semibold text-white transition hover:bg-[#3E7258] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Login"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#ECE7DE]" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-[#ECE7DE]" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#ECE7DE] font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          ) : (
            <>
              <FaGoogle />
              Continue with Google
            </>
          )}
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#4F8A6A] hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}