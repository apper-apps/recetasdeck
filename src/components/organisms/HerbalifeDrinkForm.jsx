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
    tipoBebida: "", // fría o caliente
    objetivo: [], // array de objetivos
    productos: [], // productos Herbalife disponibles
    sabor: "",
    base: "", // modo de preparación
    extras: [], // complementos opcionales
    name: "",
    contact: ""
  });

  const [errors, setErrors] = useState({});

  const steps = ["Bienvenida", "Formulario", "Receta"];

const validateForm = () => {
    const newErrors = {};

    if (!formData.tipoBebida) newErrors.tipoBebida = "Selecciona el tipo de bebida";
    if (formData.objetivo.length === 0) newErrors.objetivo = "Selecciona al menos un objetivo";
    if (formData.productos.length === 0) newErrors.productos = "Selecciona al menos un producto";
    if (!formData.sabor) newErrors.sabor = "Selecciona tu sabor principal";
    if (!formData.base) newErrors.base = "Selecciona el modo de preparación";
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
          type: "herbalife-drink"
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
    const surpriseExtras = ["colágeno", "aloe", "fibra"];
    setFormData(prev => ({ ...prev, extras: surpriseExtras }));
    toast.success("¡Perfecto! Te sorprenderemos con extras especiales");
  };

const handleObjetivoChange = (objetivo) => {
    setFormData(prev => ({
      ...prev,
      objetivo: prev.objetivo.includes(objetivo)
        ? prev.objetivo.filter(o => o !== objetivo)
        : [...prev.objetivo, objetivo]
    }));
  };

  const handleProductoChange = (producto) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.includes(producto)
        ? prev.productos.filter(p => p !== producto)
        : [...prev.productos, producto]
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
              value={formData.tipoBebida}
              onChange={(e) => handleInputChange("tipoBebida", e.target.value)}
              error={errors.tipoBebida}
              placeholder="Selecciona la temperatura"
            >
              <option value="fría">❄️ Bebida fría</option>
              <option value="caliente">☕ Bebida caliente</option>
            </Select>

            {/* Objetivo */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                ¿Cuáles son tus objetivos? <span className="text-red-500">*</span>
              </label>
              {errors.objetivo && (
                <p className="text-red-500 text-xs">{errors.objetivo}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {["Antes del ejercicio", "Durante el ejercicio", "Después del ejercicio", "Energía", "Saciedad", "Bienestar general"].map((objetivo) => (
                  <label key={objetivo} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.objetivo.includes(objetivo)}
                      onChange={() => handleObjetivoChange(objetivo)}
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="text-sm text-gray-700">{objetivo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Productos */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                ¿Qué productos Herbalife tienes disponibles? <span className="text-red-500">*</span>
              </label>
              {errors.productos && (
                <p className="text-red-500 text-xs">{errors.productos}</p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {["Fórmula 1", "Té NRG", "Aloe", "Proteína", "Colágeno", "CR7 Drive", "Té Verde Granada", "Ponche de Frutas", "BCAAs", "Rebuild Strength", "Creatina"].map((producto) => (
                  <label key={producto} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.productos.includes(producto)}
                      onChange={() => handleProductoChange(producto)}
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="text-sm text-gray-700">{producto}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sabor Principal */}
            <Select
              label="Sabor principal"
              required
              value={formData.sabor}
              onChange={(e) => handleInputChange("sabor", e.target.value)}
              error={errors.sabor}
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
              value={formData.base}
              onChange={(e) => handleInputChange("base", e.target.value)}
              error={errors.base}
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
                {["Colágeno", "Aloe", "Fibra", "Proteína extra", "Omega 3", "Vitaminas", "Antioxidantes", "Probióticos", "Minerales"].map((extra) => (
                  <label key={extra} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.extras.includes(extra)}
                      onChange={() => handleExtraChange(extra)}
                      className="w-4 h-4 text-accent-600 border-gray-300 rounded focus:ring-accent-500"
                    />
                    <span className="text-sm text-gray-700">{extra}</span>
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