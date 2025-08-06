import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import ProgressSteps from "@/components/molecules/ProgressSteps";

const HealthyFoodForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    mealType: "",
    ingredients: "",
    restrictions: "",
    flavor: "",
    name: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});

  const steps = ["Bienvenida", "Formulario", "Receta"];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.mealType) newErrors.mealType = "Selecciona el tipo de comida";
    if (!formData.flavor) newErrors.flavor = "Selecciona tu sabor preferido";
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.contact.trim()) newErrors.contact = "El contacto es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        onSubmit({
          ...formData,
          type: "healthy-food"
        });
      } catch (error) {
        // Handle any submission errors gracefully
        const errorMessage = error?.message || String(error) || "Error al enviar el formulario";
        toast.error(errorMessage);
        console.error('Form submission error:', error);
      }
    } else {
      toast.error("Por favor completa todos los campos requeridos");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSurpriseMe = () => {
    setFormData(prev => ({ ...prev, ingredients: "Te sorprendo" }));
    toast.success("¡Perfecto! Te sorprenderemos con ingredientes especiales");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg mb-4">
            <ApperIcon name="Salad" size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            Comida Saludable
          </h1>
          <p className="text-gray-600 font-body">
            Cuéntanos tus preferencias para crear la receta perfecta
          </p>
        </motion.div>

        {/* Progress */}
        <ProgressSteps currentStep={2} totalSteps={3} steps={steps} />

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meal Type */}
            <Select
              label="¿Qué tipo de comida te interesa?"
              required
              value={formData.mealType}
              onChange={(e) => handleInputChange("mealType", e.target.value)}
              error={errors.mealType}
              placeholder="Selecciona el tipo de comida"
            >
              <option value="desayuno">🌅 Desayuno</option>
              <option value="comida">🍽️ Comida</option>
              <option value="cena">🌙 Cena</option>
              <option value="snack">🍎 Snack</option>
            </Select>

            {/* Ingredients */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                ¿Qué ingredientes tienes disponibles?
              </label>
              <Textarea
                placeholder="Ejemplo: pollo, brócoli, arroz integral, aguacate..."
                value={formData.ingredients}
                onChange={(e) => handleInputChange("ingredients", e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSurpriseMe}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <ApperIcon name="Sparkles" size={16} className="mr-2" />
                  Te sorprendo
                </Button>
              </div>
            </div>

            {/* Restrictions */}
            <Input
              label="¿Tienes alguna preferencia o restricción?"
              placeholder="Ejemplo: sin gluten, vegano, bajo en carbohidratos..."
              value={formData.restrictions}
              onChange={(e) => handleInputChange("restrictions", e.target.value)}
            />

            {/* Flavor */}
            <Select
              label="¿Qué sabor prefieres?"
              required
              value={formData.flavor}
              onChange={(e) => handleInputChange("flavor", e.target.value)}
              error={errors.flavor}
              placeholder="Selecciona tu sabor favorito"
            >
              <option value="salado">🧂 Salado</option>
              <option value="dulce">🍯 Dulce</option>
              <option value="ligero">🌿 Ligero</option>
              <option value="especiado">🌶️ Especiado</option>
            </Select>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-xl p-6 border border-primary-200">
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="User" size={20} className="text-primary-600" />
                <h3 className="font-display font-semibold text-gray-800">
                  Información de contacto
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  required
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={errors.name}
                />
                
                <Input
                  label="Teléfono o correo electrónico"
                  required
                  placeholder="WhatsApp o email"
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  error={errors.contact}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="sm:w-auto"
              >
                <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
                Volver
              </Button>
              
              <Button
                type="submit"
                className="sm:flex-1 bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-600 hover:to-orange-600"
              >
                <ApperIcon name="ChefHat" size={18} className="mr-2" />
                Generar mi receta saludable
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Motivational message */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-200 rounded-xl px-6 py-3">
            <ApperIcon name="Heart" size={16} className="text-primary-600" />
            <span className="text-primary-800 font-medium text-sm">
              "Una alimentación consciente es el primer paso hacia tu transformación"
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthyFoodForm;