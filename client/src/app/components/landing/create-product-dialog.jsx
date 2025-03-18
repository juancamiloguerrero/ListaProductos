"use client";

import React, { useState } from "react";

export default function CreateProductDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Other",
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, inStock: !formData.inStock });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre del producto es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    const price = Number.parseFloat(formData.price);
    if (isNaN(price) || price <= 0) newErrors.price = "El precio debe ser un número positivo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ id: new Date().getTime().toString(), ...formData });
      setFormData({
        name: "",
        description: "",
        price: "0",
        imageUrl: "",
        category: "Other",
        inStock: true,
      });
      onOpenChange(false);
    }
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-xl">
      <div className="bg-gray-100 text-black p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-300">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Añadir Nuevo Producto</h2>
        <p className="text-gray-600 mb-4">Completa los detalles para crear un nuevo producto.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Nombre del Producto" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-200 border border-gray-400 text-gray-800" />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

          <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className="w-full p-2 rounded bg-gray-200 border border-gray-400 text-gray-800" />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}

          <input type="number" name="price" step="0.01" min="0" placeholder="Precio ($)" value={formData.price} onChange={handleChange} className="w-full p-2 rounded bg-gray-200 border border-gray-400 text-gray-800" />
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}

          <select name="category" value={formData.category} onChange={handleSelectChange} className="w-full p-2 rounded bg-gray-200 border border-gray-400 text-gray-800">
            <option value="Electronics">Electrónica</option>
            <option value="Clothing">Ropa</option>
            <option value="Home">Hogar & Cocina</option>
            <option value="Books">Libros</option>
            <option value="Other">Otros</option>
          </select>

          <input type="text" name="imageUrl" placeholder="URL de la Imagen" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 rounded bg-gray-200 border border-gray-400 text-gray-800" />

          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.inStock} onChange={handleCheckboxChange} className="w-4 h-4" />
            <span className="text-gray-700">Disponible en stock</span>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={() => onOpenChange(false)} className="bg-gray-400 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition">Cancelar</button>
            <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Crear Producto</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}