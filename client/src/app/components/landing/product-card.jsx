"use client";

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="
      bg-gradient-to-b from-gray-900 to-gray-700 
      text-white p-6 rounded-2xl shadow-xl 
      transition-all transform hover:scale-105 hover:shadow-2xl 
      flex flex-col items-center gap-4 max-w-sm mx-auto border border-gray-600
    ">
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
      )}
      <h3 className="text-xl font-bold text-gray-200 text-center">{product.name}</h3>
      <p className="text-gray-400 text-sm text-center">{product.description}</p>
      <div className="flex justify-between items-center w-full mt-2">
        <span className="text-lg font-bold text-gray-300">${product.price}</span>
        <button
          className="
            bg-red-600 text-white px-4 py-2 rounded-lg 
            hover:bg-red-700 transition shadow-md hover:shadow-lg
          "
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
      <p className={`text-sm font-medium mt-2 ${product.inStock ? "text-green-400" : "text-red-400"}`}>
        {product.inStock ? "Disponible en stock" : "Agotado"}
      </p>
    </div>
  );
}