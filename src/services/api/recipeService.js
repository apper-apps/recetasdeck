const generateRecipe = async (formData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const prompt = createPrompt(formData);
    console.log("🔍 Prompt generado:", prompt);
    
    const diaflowResponse = await sendToDiaflow(prompt);
    console.log("🔍 Respuesta completa de Diaflow:", diaflowResponse);

    const parsedRecipe = parseRecipeResponse(diaflowResponse.result || diaflowResponse.response || diaflowResponse.text || diaflowResponse.message || diaflowResponse);
    console.log("🔍 Receta parseada:", parsedRecipe);

    return {
      success: true,
      title: "✅ ¡Gracias! Tu receta personalizada está lista",
      description: "Aquí tienes tu bebida personalizada Herbalife:",
      data: parsedRecipe,
      prompt: prompt, // Para debug
      webhookResponse: diaflowResponse // Para debug adicional
    };
} catch (error) {
    // Proper error logging with serialized object
// Extract meaningful error message for logging and user display
    const errorMessage = (() => {
      if (typeof error === 'string') return error;
      if (error?.message && typeof error.message === 'string') return error.message;
      if (error?.toString && typeof error.toString === 'function') {
        const stringified = error.toString();
        return stringified !== '[object Object]' ? stringified : 'Error desconocido al generar receta';
      }
      return 'Error desconocido al generar receta';
    })();

    console.error("💥 Error completo al generar receta:", {
      message: errorMessage,
      originalError: error,
      stack: error?.stack,
      type: error?.constructor?.name,
      formData: formData
    });
    
    // Throw a meaningful error message instead of the raw error object
    throw new Error(errorMessage);
    // Extract meaningful error message from various error formats
    let errorMessage = "No pudimos procesar tu solicitud. Intenta nuevamente.";
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.toString && error.toString() !== '[object Object]') {
      errorMessage = error.toString();
    }
    
    // Si el error es del webhook, proporcionamos más información
    if (errorMessage.includes('Diaflow Webhook Error')) {
      throw new Error(`Error de conexión con el servicio de recetas: ${errorMessage}\n\nPor favor, verifica tu conexión a internet e intenta nuevamente.`);
    }
    
    // Ensure we always throw a proper Error with string message
    throw new Error(errorMessage);
  }
};

const createPrompt = (formData) => {
  const objetivo = formData.objetivo.join(", ");
  const productos = formData.productos.join(", ");
  const extras = formData.extras?.length ? formData.extras.join(", ") : "Ninguno";

  let prompt = `Quiero que me des una receta de una bebida ${formData.tipoBebida} con productos de Herbalife. Mi objetivo con esta bebida es: ${objetivo}. Me gustaría que el sabor base fuera ${formData.sabor}. Tengo disponibles los siguientes productos: ${productos}. Prefiero prepararla con ${formData.base}. Me gustaría añadir: ${extras}.`;

  // Validaciones lógicas específicas
  if (objetivo.includes("Durante el ejercicio")) {
    prompt += ` Solo utiliza productos apropiados para consumo durante el ejercicio como: CR7 Drive, Té ligero, Aloe, BCAAs, o Herbalife #1 Sport.`;
  }

  if (objetivo.includes("Después del ejercicio")) {
    prompt += ` Asegúrate de incluir productos como Rebuild Strength, Enhanced Protein Powder o Creatina para recuperación.`;
  }

  if (objetivo.includes("Antes del ejercicio")) {
    prompt += ` Incluye productos energéticos como Creatina, Herbalife #1 Sport o Té NRG.`;
  }

  const productosCafeina = ["NRG", "Té Verde Granada", "Ponche de Frutas"];
  const contieneCafeina = productosCafeina.some(p => productos.includes(p));

  if (objetivo.includes("Durante el ejercicio") && contieneCafeina) {
    prompt += ` ⚠️ Precaución: se han seleccionado productos con cafeína para consumo durante ejercicio. Sugerir cuidado.`;
  }

  prompt += ` Entrega el resultado con instrucciones simples, ingredientes exactos y recomendaciones opcionales.`;

  return prompt;
};

const sendToDiaflow = async (prompt) => {
  console.log("🚀 Enviando datos a Diaflow:", { prompt });
  
  const webhookData = {
    message: prompt,
    prompt: prompt,
    text: prompt,
    input: prompt
  };
  
  console.log("📤 Datos del webhook:", webhookData);
  
  try {
    const response = await fetch("https://api.diaflow.io/api/v1/builders/KAavBbwzDY/webhook?api_key=sk-fSMImZJuEGdZUSdSbj4rnRg23lcHpw04", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "RecetasApp/1.0"
      },
      body: JSON.stringify(webhookData)
    });

    console.log("📥 Respuesta del webhook - Status:", response.status);
    console.log("📥 Respuesta del webhook - Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error del webhook:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: response.url
      });
      throw new Error(`Diaflow Webhook Error: ${response.status} - ${response.statusText}\nRespuesta: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("✅ Respuesta exitosa del webhook:", responseData);
    return responseData;
    
  } catch (error) {
// Extract meaningful error message for sendToDiaflow errors
    const errorMessage = (() => {
      if (typeof error === 'string') return error;
      if (error?.message && typeof error.message === 'string') return error.message;
      if (error?.toString && typeof error.toString === 'function') {
        const stringified = error.toString();
        return stringified !== '[object Object]' ? stringified : 'Error de conexión con el servicio';
      }
      return 'Error de conexión con el servicio';
    })();

    console.error("💥 Error completo en sendToDiaflow:", {
      message: errorMessage,
      originalError: error,
      stack: error?.stack,
      type: error?.constructor?.name
    });
    
    // Throw a meaningful error message
    throw new Error(errorMessage);
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