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
      console.error('Recipe generation error:', err);
      
      // Provide specific error messages based on error type
      let errorMessage = "No pudimos generar tu receta en este momento. Por favor, inténtalo de nuevo.";
      
      if (err.message?.includes('Failed to fetch')) {
        errorMessage = "Problema de conexión. Verifica tu internet e inténtalo de nuevo.";
      } else if (err.message?.includes('API call failed')) {
        errorMessage = "Servicio temporalmente no disponible. Te hemos preparado una receta alternativa.";
      } else if (err.message?.includes('No content received')) {
        errorMessage = "Error procesando la respuesta. Inténtalo de nuevo en unos momentos.";
      }
      
      setError(errorMessage);
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