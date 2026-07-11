"use client";

import { useMemo, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

export default function PasswordInput({
  label,
  name,
  placeholder,
  required = true,
  showStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const validations = useMemo(
    () => ({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    }),
    [password]
  );

  const strength = Object.values(validations).filter(Boolean).length;

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[#244034]"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[#ECE7DE]
            bg-white
            pl-12
            pr-12
            text-[#244034]
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-300
            focus:border-[#4F8A6A]
            focus:ring-4
            focus:ring-[#4F8A6A]/10
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4F8A6A]"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {showStrength && (
        <>
          {/* Strength Bar */}

          <div className="mt-2 flex gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-2 flex-1 rounded-full transition-all ${
                  strength >= item
                    ? "bg-[#4F8A6A]"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Password Rules */}

          <div className="mt-3 space-y-2 text-sm">

            <div
              className={`flex items-center gap-2 ${
                validations.length
                  ? "text-[#4F8A6A]"
                  : "text-gray-400"
              }`}
            >
              <FaCheckCircle size={12} />
              Minimum 6 characters
            </div>

            <div
              className={`flex items-center gap-2 ${
                validations.uppercase
                  ? "text-[#4F8A6A]"
                  : "text-gray-400"
              }`}
            >
              <FaCheckCircle size={12} />
              At least one uppercase letter
            </div>

            <div
              className={`flex items-center gap-2 ${
                validations.lowercase
                  ? "text-[#4F8A6A]"
                  : "text-gray-400"
              }`}
            >
              <FaCheckCircle size={12} />
              At least one lowercase letter
            </div>

          </div>
        </>
      )}
    </div>
  );
}