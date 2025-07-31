import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  children,
  error,
  label,
  required,
  placeholder = "Seleccionar...",
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none";
  
  const errorStyles = error ? "border-accent-500 focus:border-accent-500 focus:ring-accent-500/20" : "";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-accent-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(baseStyles, errorStyles, className)}
          ref={ref}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-accent-600 font-medium">{error}</p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;