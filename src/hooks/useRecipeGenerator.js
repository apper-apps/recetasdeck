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
      setRecipe(generatedRecipe.data);
      return generatedRecipe.data;
} catch (err) {
      console.error('Recipe generation error:', err);
      
      // Extract error message from various formats to prevent [object Object]
let baseErrorMessage = "No pudimos generar tu receta en este momento. Por favor, inténtalo de nuevo.";
      
      // Extract meaningful message from error object with comprehensive checks
      let extractedMessage = baseErrorMessage;
      
      if (err?.message && typeof err.message === 'string' && err.message.trim()) {
        extractedMessage = err.message.trim();
      } else if (err?.response?.data?.message && typeof err.response.data.message === 'string') {
        extractedMessage = err.response.data.message;
      } else if (err?.response?.data?.error && typeof err.response.data.error === 'string') {
        extractedMessage = err.response.data.error;
      } else if (err?.data?.message && typeof err.data.message === 'string') {
        extractedMessage = err.data.message;
      } else if (err?.error && typeof err.error === 'string') {
        extractedMessage = err.error;
      } else if (typeof err === 'string' && err.trim()) {
        extractedMessage = err.trim();
      } else if (err?.toString && typeof err.toString === 'function') {
        const stringified = err.toString();
        if (stringified && stringified !== '[object Object]' && stringified !== 'Error') {
          extractedMessage = stringified;
        }
      }
      
      // Clean up the message
      extractedMessage = extractedMessage.replace(/^Error:\s*/i, '').trim();
      
      // Provide specific error messages based on error type
      let errorMessage = baseErrorMessage;
      
      if (extractedMessage.includes('Failed to fetch')) {
        errorMessage = "Problema de conexión. Verifica tu internet e inténtalo de nuevo.";
      } else if (extractedMessage.includes('API call failed')) {
        errorMessage = "Servicio temporalmente no disponible. Te hemos preparado una receta alternativa.";
      } else if (extractedMessage.includes('No content received')) {
        errorMessage = "Error procesando la respuesta. Inténtalo de nuevo en unos momentos.";
      } else if (extractedMessage.includes('Error de conexión con el servicio')) {
        errorMessage = extractedMessage; // Use the detailed service error message
      } else if (extractedMessage !== baseErrorMessage) {
        errorMessage = extractedMessage; // Use extracted message if it's meaningful
      }
      
      setError(errorMessage);
      throw new Error(errorMessage); // Always throw Error with string message
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