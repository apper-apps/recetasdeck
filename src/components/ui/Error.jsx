import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Algo salió mal al generar tu receta", 
  onRetry,
  title = "¡Ups! Tenemos un pequeño problema"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Error icon with animation */}
      <motion.div
        className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg mb-6"
        animate={{
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <ApperIcon name="AlertTriangle" size={32} className="text-white" />
      </motion.div>

      {/* Error content */}
      <div className="max-w-md">
        <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 font-body text-lg mb-6 leading-relaxed">
          {message}
        </p>

        <div className="bg-gradient-to-r from-accent-50 to-orange-50 border border-accent-200 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 text-accent-700">
            <ApperIcon name="Info" size={18} />
            <span className="font-medium text-sm">
              No te preocupes, esto pasa de vez en cuando
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RotateCcw" size={18} />
            <span>Intentar de nuevo</span>
          </Button>
        )}
        
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" size={18} />
          <span>Recargar página</span>
        </Button>
      </div>

      {/* Motivational message */}
      <motion.div
        className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-xl max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center space-x-2 text-primary-700">
          <ApperIcon name="Heart" size={16} />
          <span className="font-medium text-sm">
            "Pequeños tropiezos generan grandes aprendizajes"
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Error;