import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "¡Empecemos a crear!", 
  message = "Aún no has generado ninguna receta",
  actionLabel = "Crear mi primera receta",
  onAction,
  icon = "ChefHat"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Empty state illustration */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full opacity-60 transform -rotate-6" />
        <div className="absolute inset-2 w-28 h-28 bg-gradient-to-br from-orange-100 to-primary-100 rounded-full opacity-40 transform rotate-12" />
        
        {/* Main icon */}
        <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-primary-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
          <ApperIcon name={icon} size={48} className="text-white" />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [-5, 5, -5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ApperIcon name="Sparkles" size={16} className="text-white" />
        </motion.div>

        <motion.div
          className="absolute -bottom-1 -left-3 w-6 h-6 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{
            y: [5, -5, 5],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <ApperIcon name="Star" size={12} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="max-w-md">
        <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">
          {title}
        </h3>
        
        <p className="text-gray-600 font-body text-lg mb-8 leading-relaxed">
          {message}
        </p>

        {/* Action button */}
        {onAction && (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto transform hover:scale-105"
          >
            <ApperIcon name="Plus" size={20} />
            <span>{actionLabel}</span>
          </Button>
        )}
      </div>

      {/* Inspirational quote */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-2xl max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <ApperIcon name="Quote" size={16} className="text-white" />
          </div>
          <div>
            <p className="text-primary-800 font-medium text-sm leading-relaxed">
              "Pequeños cambios en tu alimentación generan grandes transformaciones en tu vida"
            </p>
            <p className="text-primary-600 text-xs mt-2 font-semibold">
              - Filosofía 80/20
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;