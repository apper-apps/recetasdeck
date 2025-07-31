import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  error,
  label,
  required,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
  
  const errorStyles = error ? "border-accent-500 focus:border-accent-500 focus:ring-accent-500/20" : "";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={cn(baseStyles, errorStyles, className)}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-accent-600 font-medium">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;