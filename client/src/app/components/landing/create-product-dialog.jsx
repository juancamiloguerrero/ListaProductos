"use client";

import React, { useState } from "react";
import X from "../elements/icons/X";

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; 
};

export default function CreateProductDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "Otra",
    date: getLocalDate(),
    code: "",
    quantity: "",
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
    } else if (name === "code" || name === "quantity") {
      if (value === "" || parseInt(value, 10) <= 0) {
        setErrors({ ...errors, [name]: `El ${name} debe ser mayor que 0` });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el código y la cantidad sean números válidos
    const numericCode = parseInt(formData.code, 10);
    const numericQuantity = parseInt(formData.quantity, 10);
    const numericPrice = parseInt(formData.price.replace(/\D/g, ""), 10);

    if (!numericCode || numericCode <= 0) {
      setErrors({ ...errors, code: "El código debe ser mayor que 0" });
      return;
    }

    if (!numericQuantity || numericQuantity <= 0) {
      setErrors({ ...errors, quantity: "La cantidad debe ser mayor que 0" });
      return;
    }

    if (!numericPrice || numericPrice <= 0) {
      setErrors({ ...errors, price: "El precio debe ser mayor que 0" });
      return;
    }

    onSubmit({
      id: new Date().getTime().toString(),
      ...formData,
      price: numericPrice,
      code: numericCode,
      quantity: numericQuantity,
    });

    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "Otra",
      date: new Date().toISOString().split("T")[0],
      code: "",
      quantity: "",
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
          {/* Campo: Código */}
          <label className="text-sm font-semibold">
            Código <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}

          {/* Campo: Nombre */}
          <label className="text-sm font-semibold">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />

          {/* Campo: Descripción */}
          <label className="text-sm font-semibold">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />

          {/* Campo: Cantidad */}
          <label className="text-sm font-semibold">
            Cantidad <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />
          {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}

          {/* Resto del formulario (Precio, Categoría, Imagen URL, Fecha) */}
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
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded"
              >
                <option value="Categoria 1">Categoria 1</option>
                <option value="Categoria 2">Categoria 2</option>
                <option value="Categoria 3">Categoria 3</option>
                <option value="Categoria 4">Categoria 4</option>
                <option value="Categoria 5">Categoria 5</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
          </div>

          {/* Campo: Imagen URL */}
          <label className="text-sm font-semibold">Imagen URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
          />

          {/* Campo: Fecha */}
          <label className="text-sm font-semibold">
            Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-200 rounded"
            required
          />

          {/* Botones del formulario */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 w-30 bg-white border rounded-lg hover:cursor-pointer transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black w-30 text-white rounded-lg hover:cursor-pointer transition"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}