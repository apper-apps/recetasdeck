import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const RecipeTypeCard = ({ 
  icon, 
  title, 
  description, 
  color = "primary", 
  onClick, 
  isSelected = false 
}) => {
  const colorClasses = {
    primary: {
      bg: "from-primary-500 to-primary-600",
      bgHover: "from-primary-600 to-primary-700",
      border: "border-primary-200",
      selectedBorder: "border-primary-500",
      text: "text-primary-700",
      icon: "text-primary-600"
    },
    accent: {
      bg: "from-accent-500 to-accent-600",
      bgHover: "from-accent-600 to-accent-700",
      border: "border-accent-200",
      selectedBorder: "border-accent-500",
      text: "text-accent-700",
      icon: "text-accent-600"
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 bg-white hover:shadow-xl group ${
        isSelected 
          ? `${colors.selectedBorder} shadow-lg ring-4 ring-${color}-200` 
          : `${colors.border} hover:${colors.selectedBorder} shadow-md`
      }`}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${colors.bg} rounded-full flex items-center justify-center shadow-lg`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ApperIcon name="Check" size={16} className="text-white" />
        </motion.div>
      )}

      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`w-16 h-16 bg-gradient-to-r ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <ApperIcon name={icon} size={28} className="text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-display font-bold text-gray-800 mb-2 group-hover:text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 font-body leading-relaxed group-hover:text-gray-700">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className={`mt-4 flex items-center ${colors.text} font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300`}>
        <span>Seleccionar</span>
        <ApperIcon name="ArrowRight" size={16} className="ml-2" />
      </div>
    </motion.div>
  );
};

export default RecipeTypeCard;