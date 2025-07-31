import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import WelcomeScreen from "@/components/organisms/WelcomeScreen";
import HealthyFoodForm from "@/components/organisms/HealthyFoodForm";
import HerbalifeDrinkForm from "@/components/organisms/HerbalifeDrinkForm";
import RecipeDisplay from "@/components/organisms/RecipeDisplay";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

import useRecipeGenerator from "@/hooks/useRecipeGenerator";

const AppContent = () => {
  const [currentStep, setCurrentStep] = useState("welcome"); // welcome, healthy-form, herbalife-form, recipe
  const [recipeType, setRecipeType] = useState("");
  const [formData, setFormData] = useState(null);
  
  const { recipe, loading, error, generateRecipe, resetRecipe } = useRecipeGenerator();

  const handleSelectType = (type) => {
    setRecipeType(type);
    if (type === "healthy-food") {
      setCurrentStep("healthy-form");
    } else {
      setCurrentStep("herbalife-form");
    }
  };

  const handleFormSubmit = async (data) => {
    setFormData(data);
    try {
      await generateRecipe(data);
      setCurrentStep("recipe");
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const handleNewRecipe = () => {
    resetRecipe();
    setCurrentStep("welcome");
    setRecipeType("");
    setFormData(null);
  };

  const handleBackToWelcome = () => {
    resetRecipe();
    setCurrentStep("welcome");
    setRecipeType("");
    setFormData(null);
  };

  const handleBackFromForm = () => {
    setCurrentStep("welcome");
    setRecipeType("");
  };

  const renderContent = () => {
    if (loading) {
      return <Loading message="Generando tu receta perfecta..." />;
    }

    if (error) {
      return (
        <Error
          message={error}
          onRetry={() => formData && handleFormSubmit(formData)}
          title="¡Ups! Tenemos un pequeño problema"
        />
      );
    }

    switch (currentStep) {
      case "welcome":
        return <WelcomeScreen onSelectType={handleSelectType} />;
      
      case "healthy-form":
        return (
          <HealthyFoodForm
            onSubmit={handleFormSubmit}
            onBack={handleBackFromForm}
          />
        );
      
      case "herbalife-form":
        return (
          <HerbalifeDrinkForm
            onSubmit={handleFormSubmit}
            onBack={handleBackFromForm}
          />
        );
      
      case "recipe":
        return recipe ? (
          <RecipeDisplay
            recipe={recipe}
            recipeType={recipeType}
            onNewRecipe={handleNewRecipe}
            onBack={handleBackToWelcome}
          />
        ) : null;
      
      default:
        return <WelcomeScreen onSelectType={handleSelectType} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-orange-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;