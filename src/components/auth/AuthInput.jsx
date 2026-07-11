export default function AuthInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  icon: Icon = null // Dynamic optional icon support
}) {
  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[#244034] block"
      >
        {label}
      </label>

      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4F8A6A] transition-colors duration-200">
            <Icon className="text-base" />
          </div>
        )}
        
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`h-12 w-full rounded-xl border border-[#ECE7DE] bg-white text-[#244034] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#4F8A6A] focus:ring-4 focus:ring-[#4F8A6A]/5 ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}