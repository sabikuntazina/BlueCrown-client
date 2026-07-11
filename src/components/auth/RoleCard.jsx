import { FaCheckCircle } from "react-icons/fa";

export default function RoleCard({
  title,
  description,
  value,
  icon,
  selectedRole,
  setSelectedRole,
}) {
  const isSelected = selectedRole === value;

  return (
    <button
      type="button"
      onClick={() => setSelectedRole(value)}
      className={`relative w-full rounded-2xl border p-5 text-left transition-all duration-300
        ${
          isSelected
            ? "border-[#4F8A6A] bg-[#EEF8F1] shadow-md"
            : "border-[#ECE7DE] bg-white hover:border-[#4F8A6A] hover:-translate-y-1 hover:shadow-md"
        }`}
    >
      {/* Selected Badge */}

      {isSelected && (
        <FaCheckCircle className="absolute right-4 top-4 text-xl text-[#4F8A6A]" />
      )}

      {/* Icon */}

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5F9F6] text-3xl text-[#4F8A6A]">
        {icon}
      </div>

      {/* Content */}

      <h3 className="text-lg font-bold text-[#244034]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>
    </button>
  );
}