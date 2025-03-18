"use client";

import React, { useState } from "react";
import X from "../elements/icons/X";

export default function CreateProductDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Otra",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue ? parseInt(numericValue, 10).toLocaleString("es-CO") : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (value === "" || parseInt(value.replace(/\D/g, ""), 10) <= 0) {
        setErrors({ ...errors, price: "El precio debe ser mayor que 0" });
      } else {
        setErrors({ ...errors, price: "" });
      }
      setFormData({ ...formData, [name]: formatPrice(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPrice = parseInt(formData.price.replace(/\D/g, ""), 10);
    if (!numericPrice || numericPrice <= 0) {
      setErrors({ ...errors, price: "El precio debe ser mayor que 0" });
      return;
    }

    onSubmit({
      id: new Date().getTime().toString(),
      ...formData,
      price: numericPrice,
    });

    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "Otra",
      date: new Date().toISOString().split("T")[0],
    });

    onOpenChange(false);
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/80">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative border border-gray-200">
        <button onClick={() => onOpenChange(false)} className="absolute top-5 right-5 cursor-pointer">
          <X />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Agregar nuevo producto</h2>
        <p className="text-sm text-gray-600 mb-6">Complete los detalles para crear un nuevo producto.</p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-sm font-semibold">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
          
          <label className="text-sm font-semibold">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-semibold">
                Precio ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">COP</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full p-2 pl-12 border border-gray-200 rounded"
                  required
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div className="w-1/2">
              <label className="text-sm font-semibold">Categoría</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded">
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
                <option value="categoria3">Categoria 3</option>
                <option value="categoria4">Categoria 4</option>
                <option value="categoria5">Categoria 5</option>
                <option value="categoria6">Otra</option>
              </select>
            </div>
          </div>
          
          <label className="text-sm font-semibold">Imagen URL</label>
          <input type="text" placeholder="https://example.com/image.jpg" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" />
          
          <label className="text-sm font-semibold">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
          
          <div className="flex justify-center gap-6 mt-6">
            <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 w-30 bg-white border rounded-lg hover:cursor-pointer transition">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-black w-30 text-white rounded-lg hover:cursor-pointer transition">Crear</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}