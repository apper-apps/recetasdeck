import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressSteps from "@/components/molecules/ProgressSteps";

const RecipeDisplay = ({ recipe, onNewRecipe, onBack, recipeType }) => {
  const steps = ["Bienvenida", "Formulario", "Receta"];

  const copyToClipboard = async () => {
    const recipeText = `
${recipe.title}

INGREDIENTES:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

INSTRUCCIONES:
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

TIP NUTRICIONAL:
${recipe.nutritionalTip}

${recipe.motivationalQuote}

---
Generado por Recetas 80/20 - Nutre y Transforma
    `.trim();

    try {
      await navigator.clipboard.writeText(recipeText);
      toast.success("¡Receta copiada al portapapeles!");
    } catch (err) {
      toast.error("No se pudo copiar la receta");
    }
  };

  const shareWhatsApp = () => {
    const recipeText = `🍽️ *${recipe.title}*

*INGREDIENTES:*
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

*INSTRUCCIONES:*
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}

*💡 TIP NUTRICIONAL:*
${recipe.nutritionalTip}

✨ _${recipe.motivationalQuote}_

---
🌟 Recetas 80/20 - Nutre y Transforma`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(recipeText)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("¡Compartiendo en WhatsApp!");
  };

  const getRecipeIcon = () => {
    return recipeType === "healthy-food" ? "Salad" : "Coffee";
  };

  const getColorScheme = () => {
    return recipeType === "healthy-food" 
      ? {
          primary: "from-primary-500 to-primary-600",
          secondary: "from-primary-50 to-orange-50",
          accent: "primary",
          text: "text-primary-600"
        }
      : {
          primary: "from-accent-500 to-accent-600", 
          secondary: "from-accent-50 to-orange-50",
          accent: "accent",
          text: "text-accent-600"
        };
  };

  const colors = getColorScheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-orange-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors.primary} rounded-xl shadow-lg mb-4`}>
            <ApperIcon name={getRecipeIcon()} size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            ¡Tu receta está lista!
          </h1>
          <p className="text-gray-600 font-body">
            Creada especialmente para ti con amor y nutrición
          </p>
        </motion.div>

        {/* Progress */}
        <ProgressSteps currentStep={3} totalSteps={3} steps={steps} />

        {/* Recipe Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Recipe Header */}
          <div className={`bg-gradient-to-r ${colors.secondary} border-b border-gray-100 p-8`}>
            <motion.h2
              className="text-2xl md:text-3xl font-display font-bold text-gray-800 text-center leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {recipe.title}
            </motion.h2>
          </div>

          <div className="p-8 space-y-8">
            {/* Ingredients */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 bg-gradient-to-r ${colors.primary} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name="ShoppingCart" size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800">
                  Ingredientes
                </h3>
              </div>
              <div className="grid gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r ${colors.primary} rounded-full flex-shrink-0`} />
                    <span className="text-gray-700 font-medium">{ingredient}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 bg-gradient-to-r ${colors.primary} rounded-lg flex items-center justify-center`}>
                  <ApperIcon name="ChefHat" size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-gray-800">
                  Instrucciones
                </h3>
              </div>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${colors.primary} rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {instruction}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nutritional Tip */}
            <motion.div
              className={`bg-gradient-to-r ${colors.secondary} border border-${colors.accent}-200 rounded-xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${colors.primary} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <ApperIcon name="Lightbulb" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-gray-800 mb-2">
                    💡 Tip Nutricional
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {recipe.nutritionalTip}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              className="text-center p-6 bg-gradient-to-r from-orange-50 to-primary-50 border border-orange-200 rounded-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-3">
                <ApperIcon name="Heart" size={20} className="text-orange-600" />
                <ApperIcon name="Sparkles" size={16} className="text-primary-600" />
                <ApperIcon name="Heart" size={20} className="text-orange-600" />
              </div>
              <p className="text-lg font-display font-semibold text-gray-800 italic">
                "{recipe.motivationalQuote}"
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Button
            onClick={copyToClipboard}
            className={`sm:flex-1 bg-gradient-to-r ${colors.primary} hover:shadow-lg`}
          >
            <ApperIcon name="Copy" size={18} className="mr-2" />
            Copiar receta
          </Button>

          <Button
            onClick={shareWhatsApp}
            className="sm:flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
          >
            <ApperIcon name="MessageCircle" size={18} className="mr-2" />
            Compartir por WhatsApp
          </Button>

          <Button
            onClick={onNewRecipe}
            variant="outline"
            className={`sm:flex-1 border-2 border-${colors.accent}-300 ${colors.text} hover:bg-${colors.accent}-50`}
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            Generar nueva receta
          </Button>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDisplay;