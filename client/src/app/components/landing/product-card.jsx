"use client";

import { useState } from "react";

export default function ProductCard({ product, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Formatear la fecha de creación
  const formattedDate = new Date(product.date + "T00:00:00").toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white text-gray-900 p-4 rounded-xl shadow-md transition-all transform hover:shadow-lg w-full max-w-[350px] md:max-w-[400px] h-auto min-h-[400px] border-dashed border border-gray-400 relative flex flex-col">
      {/* Etiqueta de categoría */}
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Imagen del producto */}
      <div className="relative w-full h-[55%] overflow-hidden rounded-lg">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="flex flex-col justify-between flex-grow p-2">
        <h3 className="text-md font-bold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>

        {/* Código y Cantidad */}
        <div className="flex gap-4 mt-2">
          <div>
            <span className="text-xs text-gray-500">Código: </span>
            <span className="text-sm font-semibold text-gray-900">{product.code}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500">Cantidad: </span>
            <span className="text-sm font-semibold text-gray-900">{product.quantity}</span>
          </div>
        </div>

        {/* Fecha de creación */}
        <div className="mt-2">
          <span className="text-xs text-gray-500">Fecha de creación: </span>
          <span className="text-sm font-semibold text-gray-900">{formattedDate}</span>
        </div>

        {/* Precio y menú de opciones */}
        <div className="flex justify-between items-center mt-2 relative">
          <span className="text-lg font-bold text-black">
            {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(product.price)}
          </span>

          {/* Botón de menú */}
          <button
            className="text-red-500 hover:text-black transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú de opciones"
          >
            •••
          </button>

          {/* Menú de opciones */}
          {menuOpen && (
            <div className="absolute right-0 top-6 bg-white shadow-md rounded-lg border border-gray-200 w-32 text-sm">
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={() => {
                  if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
                    onDelete(product.id);
                    setMenuOpen(false);
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}