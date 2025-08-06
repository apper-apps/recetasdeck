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
    drinkType: "", // fría o caliente
    objetivo: "", // energía, saciedad, recuperación, etc.
    restricciones: [], // sin gluten, sin lactosa, sin azúcar, vegano
    subtipo: "", // desayuno, comida, cena, postre, snack
    ingredienteBase: "", // productos Herbalife
    saborPrincipal: "",
    modoPreparacion: "", // agua, leche descremada, leche de almendra/avena/soya
    extras: [], // colágeno, aloe, fibra, etc.
    name: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});

  const steps = ["Bienvenida", "Formulario", "Receta"];

  const validateForm = () => {
    const newErrors = {};

if (!formData.drinkType) newErrors.drinkType = "Selecciona el tipo de bebida";
    if (!formData.objetivo) newErrors.objetivo = "Selecciona tu objetivo";
    if (!formData.subtipo) newErrors.subtipo = "Selecciona el subtipo";
    if (!formData.ingredienteBase) newErrors.ingredienteBase = "Selecciona el ingrediente base";
    if (!formData.saborPrincipal) newErrors.saborPrincipal = "Selecciona tu sabor principal";
    if (!formData.modoPreparacion) newErrors.modoPreparacion = "Selecciona el modo de preparación";
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
    const surpriseExtras = ["colágeno", "aloe", "fibra"];
    setFormData(prev => ({ ...prev, extras: surpriseExtras }));
    toast.success("¡Perfecto! Te sorprenderemos con extras especiales");
  };

  const handleRestriccionChange = (restriccion) => {
    setFormData(prev => ({
      ...prev,
      restricciones: prev.restricciones.includes(restriccion)
        ? prev.restricciones.filter(r => r !== restriccion)
        : [...prev.restricciones, restriccion]
    }));
  };

  const handleExtraChange = (extra) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
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
{/* Tipo */}
            <Select
              label="Tipo de bebida"
              required
              value={formData.drinkType}
              onChange={(e) => handleInputChange("drinkType", e.target.value)}
              error={errors.drinkType}
              placeholder="Selecciona la temperatura"
            >
              <option value="bebida fría">❄️ Bebida fría</option>
              <option value="bebida caliente">☕ Bebida caliente</option>
            </Select>

            {/* Objetivo */}
            <Select
              label="¿Cuál es tu objetivo?"
              required
              value={formData.objetivo}
              onChange={(e) => handleInputChange("objetivo", e.target.value)}
              error={errors.objetivo}
              placeholder="Selecciona tu objetivo"
            >
              <option value="energía">⚡ Energía</option>
              <option value="saciedad">🥱 Saciedad</option>
              <option value="recuperación">💪 Recuperación</option>
              <option value="bienestar general">✨ Bienestar general</option>
              <option value="control de peso">⚖️ Control de peso</option>
              <option value="hidratación">💧 Hidratación</option>
            </Select>

            {/* Restricciones */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Restricciones alimenticias (puedes seleccionar varias)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["sin gluten", "sin lactosa", "sin azúcar", "vegano"].map((restriccion) => (
                  <label key={restriccion} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.restricciones.includes(restriccion)}
                      onChange={() => handleRestriccionChange(restriccion)}
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{restriccion}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subtipo */}
            <Select
              label="¿Para cuándo es la bebida?"
              required
              value={formData.subtipo}
              onChange={(e) => handleInputChange("subtipo", e.target.value)}
              error={errors.subtipo}
              placeholder="Selecciona el momento"
            >
              <option value="desayuno">🌅 Desayuno</option>
              <option value="comida">🍽️ Comida</option>
              <option value="cena">🌙 Cena</option>
              <option value="postre">🍰 Postre</option>
              <option value="snack">🥨 Snack</option>
            </Select>

            {/* Ingrediente Base */}
            <Select
              label="Ingrediente base (producto Herbalife)"
              required
              value={formData.ingredienteBase}
              onChange={(e) => handleInputChange("ingredienteBase", e.target.value)}
              error={errors.ingredienteBase}
              placeholder="Selecciona el producto base"
            >
              <option value="batido Fórmula 1">🥤 Batido Fórmula 1</option>
              <option value="té Herbalife">🍃 Té Herbalife</option>
              <option value="aloe">🌿 Aloe</option>
              <option value="proteína">💪 Proteína</option>
              <option value="colágeno">✨ Colágeno</option>
              <option value="varios productos">🎯 Varios productos</option>
            </Select>

            {/* Sabor Principal */}
            <Select
              label="Sabor principal"
              required
              value={formData.saborPrincipal}
              onChange={(e) => handleInputChange("saborPrincipal", e.target.value)}
              error={errors.saborPrincipal}
              placeholder="Selecciona tu sabor favorito"
            >
              <option value="chocolate">🍫 Chocolate</option>
              <option value="vainilla">🍦 Vainilla</option>
              <option value="mango">🥭 Mango</option>
              <option value="fresa">🍓 Fresa</option>
              <option value="cookies and cream">🍪 Cookies and Cream</option>
              <option value="cappuccino">☕ Cappuccino</option>
              <option value="menta">🌿 Menta</option>
              <option value="tropical">🏝️ Tropical</option>
            </Select>

            {/* Modo de Preparación */}
            <Select
              label="¿Cómo prefieres prepararlo?"
              required
              value={formData.modoPreparacion}
              onChange={(e) => handleInputChange("modoPreparacion", e.target.value)}
              error={errors.modoPreparacion}
              placeholder="Selecciona el modo de preparación"
            >
              <option value="agua">💧 Agua</option>
              <option value="leche descremada">🥛 Leche descremada</option>
              <option value="leche de almendra">🌰 Leche de almendra</option>
              <option value="leche de avena">🌾 Leche de avena</option>
              <option value="leche de soya">🌱 Leche de soya</option>
            </Select>

            {/* Extras */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Extras opcionales (puedes seleccionar varios)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["colágeno", "aloe", "fibra", "proteína extra", "omega 3", "vitaminas"].map((extra) => (
                  <label key={extra} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.extras.includes(extra)}
                      onChange={() => handleExtraChange(extra)}
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{extra}</span>
                  </label>
                ))}
              </div>
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