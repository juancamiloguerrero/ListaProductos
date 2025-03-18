"use client";

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white text-gray-900 p-4 rounded-xl shadow-md transition-all transform hover:shadow-lg max-w-sm mx-auto border">
      {/* Etiqueta de stock */}
      {product.inStock && (
        <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full absolute mt-2 ml-2">
          In Stock
        </span>
      )}

      {/* Imagen del producto */}
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.description}</p>

        {/* Precio y botón de acción */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-black">${product.price}</span>
          <button
            className="text-red-500 hover:text-red-700 transition"
            onClick={() => onDelete(product.id)}
          >
            •••
          </button>
        </div>

        {/* Estado del stock */}
        <p className={`text-sm font-medium mt-2 ${product.inStock ? "text-green-500" : "text-red-500"}`}>
          {product.inStock ? "Disponible en stock" : "Agotado"}
        </p>
      </div>
    </div>
  );
}
