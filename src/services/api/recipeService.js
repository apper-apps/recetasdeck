const generateRecipe = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const prompt = createPrompt(formData);
  
  try {
    // Use Apper SDK for secure API calls
    if (!window.Apper) {
      console.warn('Apper SDK not loaded, using fallback recipe');
      return generateFallbackRecipe(formData);
    }

    try {
      const response = await window.Apper.callFunction({
        functionName: 'generateRecipe',
        parameters: {
          prompt: prompt,
          model: 'gpt-3.5-turbo',
          temperature: 0.8,
          max_tokens: 400
        }
      });

      if (!response || !response.success) {
        throw new Error('API call failed: ' + (response?.error || 'Unknown error'));
      }

      const content = response.data?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from API');
      }

      return parseRecipeResponse(content);
    } catch (error) {
      console.error('Apper SDK error:', error);
      throw error;
    }
    
    // Fallback to direct API call if Apper fails
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: createPrompt(formData)
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;
    
    // Send to Pabbly webhook
    await sendToPabbly(formData, generatedContent);
    
    // Parse the response into structured data
    return parseRecipeResponse(generatedContent);
    
  } catch (error) {
    console.error("Error generating recipe:", error);
    // Return a fallback recipe if API fails
    return generateFallbackRecipe(formData);
  }
};

const createPrompt = (formData) => {
  const isHealthyFood = formData.type === "healthy-food";
  
  const typeText = isHealthyFood ? formData.mealType : `bebida ${formData.drinkType}`;
  const ingredientsText = formData.ingredients || "ingredientes de temporada";
const restrictionsText = formData.restrictions || "ninguna restricción especial";
  const flavorText = formData.flavor;
  const herbalifeProductsText = isHealthyFood ? "ninguno" : formData.herbalifeProduct;

  return `Actúa como un chef experto en nutrición saludable. Genera una receta en español para un usuario que desea una ${typeText}. Ingredientes disponibles: ${ingredientsText}. Restricciones o preferencias: ${restrictionsText}. Sabor preferido: ${flavorText}. Productos Herbalife: ${herbalifeProductsText}.

✅ La receta debe:
- Usar solo ingredientes fáciles de conseguir en México.
- Evitar cualquier preparación frita o capeada.
- Ser sencilla, práctica y con buen sabor.

✅ Incluye:
1. Título atractivo
2. Lista clara de ingredientes
3. Instrucciones paso a paso
4. Tip nutricional breve
5. Frase motivadora estilo Coach 80/20 como: "Pequeños cambios generan grandes transformaciones".`;
};

const sendToPabbly = async (formData, recipeGenerated) => {
  try {
    await fetch("https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZhMDYzMjA0MzA1MjZhNTUzMjUxMzQi_pc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: formData.name,
        contacto: formData.contact,
        tipo_receta: formData.type,
        ingredientes: formData.ingredients,
restricciones: formData.restrictions,
        sabor: formData.flavor,
        productos_herbalife: formData.herbalifeProduct || "ninguno",
        receta_generada: recipeGenerated
      })
    });
  } catch (error) {
    console.error("Error sending to Pabbly:", error);
    // Don't throw error, just log it
  }
};

const parseRecipeResponse = (content) => {
  const lines = content.split("\n").filter(line => line.trim());
  
  let title = "";
  let ingredients = [];
  let instructions = [];
  let nutritionalTip = "";
  let motivationalQuote = "";
  
  let currentSection = "";
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase().trim();
    
    // Detect sections
    if (lowerLine.includes("ingredientes") || lowerLine.includes("materiales")) {
      currentSection = "ingredients";
      continue;
    } else if (lowerLine.includes("instrucciones") || lowerLine.includes("preparación") || lowerLine.includes("pasos")) {
      currentSection = "instructions";
      continue;
    } else if (lowerLine.includes("tip") || lowerLine.includes("consejo") || lowerLine.includes("nutricional")) {
      currentSection = "tip";
      continue;
    } else if (lowerLine.includes("motivadora") || lowerLine.includes("transformación") || lowerLine.includes("coach")) {
      currentSection = "quote";
      continue;
    }
    
    // Extract title (first non-empty line that's not a section header)
    if (!title && line.trim() && !lowerLine.includes("ingredientes") && !lowerLine.includes("instrucciones")) {
      title = line.trim().replace(/^\d+\.\s*/, "").replace(/^#\s*/, "");
      continue;
    }
    
    // Process content based on current section
    if (currentSection === "ingredients" && line.trim()) {
      const ingredient = line.trim().replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");
      if (ingredient && !ingredient.toLowerCase().includes("ingredientes")) {
        ingredients.push(ingredient);
      }
    } else if (currentSection === "instructions" && line.trim()) {
      const instruction = line.trim().replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");
      if (instruction && !instruction.toLowerCase().includes("instrucciones")) {
        instructions.push(instruction);
      }
    } else if (currentSection === "tip" && line.trim()) {
      if (!nutritionalTip) {
        nutritionalTip = line.trim().replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");
      } else {
        nutritionalTip += " " + line.trim();
      }
    } else if (currentSection === "quote" && line.trim()) {
      if (!motivationalQuote) {
        motivationalQuote = line.trim().replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "").replace(/"/g, "");
      } else {
        motivationalQuote += " " + line.trim().replace(/"/g, "");
      }
    }
  }
  
  // Fallback values if parsing fails
  if (!title) title = "Receta Nutritiva Especial";
  if (ingredients.length === 0) ingredients = ["Ingredientes según disponibilidad"];
  if (instructions.length === 0) instructions = ["Combinar ingredientes según preferencias"];
  if (!nutritionalTip) nutritionalTip = "Esta receta aporta nutrientes esenciales para tu bienestar diario.";
  if (!motivationalQuote) motivationalQuote = "Pequeños cambios generan grandes transformaciones";
  
  return {
    id: Date.now().toString(),
    title,
    ingredients,
    instructions,
    nutritionalTip,
    motivationalQuote,
    timestamp: new Date().toISOString()
  };
};

const generateFallbackRecipe = (formData) => {
  const isHealthyFood = formData.type === "healthy-food";
  
  if (isHealthyFood) {
    return {
      id: Date.now().toString(),
      title: `${formData.mealType ? formData.mealType.charAt(0).toUpperCase() + formData.mealType.slice(1) : "Comida"} Saludable y Nutritiva`,
      ingredients: [
        "2 tazas de vegetales frescos de temporada",
        "1 porción de proteína magra (pollo, pescado o legumbres)",
        "1 cucharada de aceite de oliva extra virgen",
        "Hierbas frescas al gusto",
        "Especias naturales para realzar el sabor"
      ],
      instructions: [
        "Lava y prepara todos los vegetales cortándolos en trozos uniformes",
        "Cocina la proteína de tu elección con un mínimo de aceite",
        "Saltea los vegetales manteniendo su textura crujiente",
        "Combina todos los ingredientes y sazona con hierbas y especias",
        "Sirve inmediatamente para conservar todos los nutrientes"
      ],
      nutritionalTip: "Esta receta combina proteínas de alta calidad con vegetales ricos en vitaminas y minerales, proporcionando una comida balanceada que nutre tu cuerpo y te da energía sostenida.",
      motivationalQuote: "Cada comida saludable es una inversión en tu futuro más brillante",
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      id: Date.now().toString(),
title: `Batido Energético ${formData.flavor ? formData.flavor.charAt(0).toUpperCase() + formData.flavor.slice(1) : "Especial"} con Herbalife`,
      ingredients: [
        `2 scoops de ${formData.herbalifeProduct || "Fórmula 1"} Herbalife`,
        "1 taza de agua o leche vegetal",
        "1/2 taza de fruta fresca de temporada",
        "1 cucharadita de miel natural (opcional)",
        "Hielo al gusto"
      ],
instructions: [
        "Agrega el agua o leche vegetal en la licuadora",
        `Incorpora los scoops de ${formData.herbalifeProduct || "producto Herbalife"}`,
        "Añade la fruta fresca y la miel si deseas mayor dulzura",
        "Licúa por 30-45 segundos hasta obtener consistencia cremosa",
        "Sirve inmediatamente con hielo para una experiencia refrescante"
      ],
      nutritionalTip: "Esta bebida combina la nutrición completa de Herbalife con ingredientes naturales, proporcionando proteínas, vitaminas y minerales esenciales para apoyar tu bienestar diario.",
      motivationalQuote: "Cada sorbo es un paso hacia la mejor versión de ti mismo",
      timestamp: new Date().toISOString()
    };
  }
};

export default {
  generateRecipe
};