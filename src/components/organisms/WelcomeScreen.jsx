import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import RecipeTypeCard from "@/components/molecules/RecipeTypeCard";

const WelcomeScreen = ({ onSelectType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl shadow-xl mb-6"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ApperIcon name="ChefHat" size={32} className="text-white" />
          </motion.div>

          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              ✨ Bienvenido a Recetas 80/20 ✨
            </h1>
            <p className="text-xl text-gray-700 font-body leading-relaxed max-w-2xl mx-auto">
              Elige tu tipo de receta y transforma tu día con pequeños cambios.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="relative mt-8">
            <motion.div
              className="absolute -top-4 left-1/4 w-6 h-6 text-orange-400"
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ApperIcon name="Sparkles" size={24} />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 right-1/4 w-4 h-4 text-primary-400"
              animate={{
                y: [10, -10, 10],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <ApperIcon name="Star" size={16} />
            </motion.div>
          </div>
        </motion.div>

        {/* Recipe type selection */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-display font-bold text-center text-gray-800 mb-8">
            ¿Qué tipo de receta deseas?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <RecipeTypeCard
              icon="Salad"
              title="Comida saludable"
              description="Recetas nutritivas sin productos Herbalife. Perfectas para cualquier momento del día con ingredientes naturales."
              color="primary"
              onClick={() => onSelectType("healthy-food")}
            />

            <RecipeTypeCard
              icon="Coffee"
              title="Bebida con productos Herbalife"
              description="Deliciosas bebidas nutritivas que incluyen productos Herbalife para potenciar tu bienestar."
              color="accent"
              onClick={() => onSelectType("herbalife-drink")}
            />
          </div>
        </motion.div>

        {/* Inspirational quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-2xl px-8 py-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Heart" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-primary-800 font-semibold">
                "Pequeños cambios generan grandes transformaciones"
              </p>
              <p className="text-primary-600 text-sm font-medium">
                Filosofía 80/20
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating background elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full opacity-20"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-30"
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;