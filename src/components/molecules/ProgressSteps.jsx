import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ProgressSteps = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                    : isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg ring-4 ring-orange-200"
                    : "bg-gray-200 text-gray-500"
                }`}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <ApperIcon name="Check" size={18} />
                ) : (
                  stepNumber
                )}
              </motion.div>
              
              <motion.span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  isActive || isCompleted ? "text-gray-800" : "text-gray-500"
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {step}
              </motion.span>
            </div>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-orange-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span>{Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%</span>
      </div>
    </div>
  );
};

export default ProgressSteps;