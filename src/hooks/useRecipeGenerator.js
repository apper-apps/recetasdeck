import { useState } from "react";
import recipeService from "@/services/api/recipeService";

const useRecipeGenerator = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecipe = async (formData) => {
    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const generatedRecipe = await recipeService.generateRecipe(formData);
      setRecipe(generatedRecipe);
      return generatedRecipe;
    } catch (err) {
      setError("No pudimos generar tu receta en este momento. Por favor, inténtalo de nuevo.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetRecipe = () => {
    setRecipe(null);
    setError("");
    setLoading(false);
  };

  return {
    recipe,
    loading,
    error,
    generateRecipe,
    resetRecipe
  };
};

export default useRecipeGenerator;