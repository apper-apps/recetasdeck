import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Textarea from "@/components/atoms/Textarea";
import ProgressSteps from "@/components/molecules/ProgressSteps";

const HerbalifeDrinkForm = ({ onSubmit, onBack }) => {
const [formData, setFormData] = useState({
    drinkType: "",
    flavor: "",
    herbalifeProduct: "",
    ingredients: "",
    restrictions: "",
    name: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});

  const steps = ["Bienvenida", "Formulario", "Receta"];

  const validateForm = () => {
    const newErrors = {};

if (!formData.drinkType) newErrors.drinkType = "Selecciona el tipo de bebida";
    if (!formData.flavor) newErrors.flavor = "Selecciona tu sabor preferido";
    if (!formData.herbalifeProduct) newErrors.herbalifeProduct = "Selecciona el producto Herbalife";
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.contact.trim()) newErrors.contact = "El contacto es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        type: "herbalife-drink"
      });
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
    toast.success("¡Perfecto! Te sorprenderemos con ingredientes naturales especiales");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl shadow-lg mb-4">
            <ApperIcon name="Coffee" size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            Bebida con Herbalife
          </h1>
          <p className="text-gray-600 font-body">
            Personaliza tu bebida nutritiva con productos Herbalife
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
            {/* Drink Type */}
            <Select
              label="¿Qué tipo de bebida deseas?"
              required
              value={formData.drinkType}
              onChange={(e) => handleInputChange("drinkType", e.target.value)}
              error={errors.drinkType}
              placeholder="Selecciona la temperatura"
            >
              <option value="fria">❄️ Fría</option>
              <option value="caliente">☕ Caliente</option>
            </Select>

            {/* Flavor */}
            <Select
              label="¿Qué sabor prefieres?"
              required
              value={formData.flavor}
              onChange={(e) => handleInputChange("flavor", e.target.value)}
              error={errors.flavor}
              placeholder="Selecciona tu sabor favorito"
            >
              <option value="chocolate">🍫 Chocolate</option>
              <option value="vainilla">🍦 Vainilla</option>
              <option value="mango">🥭 Mango</option>
              <option value="fresa">🍓 Fresa</option>
              <option value="otro">🌈 Otro</option>
            </Select>

            {/* Herbalife Product */}
            <Select
label="¿Qué producto Herbalife deseas usar?"
              required
              value={formData.herbalifeProduct}
              onChange={(e) => handleInputChange("herbalifeProduct", e.target.value)}
              error={errors.herbalifeProduct}
              placeholder="Selecciona el producto"
            >
              <option value="formula-1">🥤 Fórmula 1</option>
              <option value="proteina-gold">💪 Proteína Gold</option>
              <option value="aloe">🌿 Aloe</option>
              <option value="te">🍃 Té</option>
              <option value="colageno">✨ Colágeno</option>
              <option value="varios">🎯 Varios</option>
            </Select>

            {/* Natural Ingredients */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                ¿Qué ingredientes naturales tienes disponibles?
              </label>
              <Textarea
                placeholder="Ejemplo: plátano, espinacas, leche de almendras, canela..."
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
              placeholder="Ejemplo: sin azúcar, sin lácteos, vegano..."
              value={formData.restrictions}
              onChange={(e) => handleInputChange("restrictions", e.target.value)}
            />

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-accent-50 to-orange-50 rounded-xl p-6 border border-accent-200">
              <div className="flex items-center space-x-2 mb-4">
                <ApperIcon name="User" size={20} className="text-accent-600" />
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
                className="sm:w-auto border-accent-300 text-accent-600 hover:bg-accent-50"
              >
                <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
                Volver
              </Button>
              
              <Button
                type="submit"
                className="sm:flex-1 bg-gradient-to-r from-accent-500 to-orange-500 hover:from-accent-600 hover:to-orange-600"
              >
                <ApperIcon name="Coffee" size={18} className="mr-2" />
                Generar mi bebida Herbalife
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
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-50 to-orange-50 border border-accent-200 rounded-xl px-6 py-3">
            <ApperIcon name="Heart" size={16} className="text-accent-600" />
            <span className="text-accent-800 font-medium text-sm">
              "Cada sorbo es un paso hacia tu mejor versión"
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HerbalifeDrinkForm;