"use client";

export default function ProductFilters({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-4 mb-6 relative">
      <span className="text-sm font-semibold text-gray-700">Ordenar por:</span>
      <div className="relative group">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer" /* Cambiar el cursor */
        >
          <option value="name">Nombre</option>
          <option value="code">Código</option>
          <option value="quantity">Cantidad</option>
          <option value="date">Fecha de creación</option>
        </select>
        {/* Tooltip con animación de burbuja flotando */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out animate-float">
          Ordenar ascendentemente
          {/* Flecha del tooltip */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-black border-transparent"></div>
        </div>
      </div>

      {/* Estilos CSS para la animación */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(-5%, 0);
          }
          50% {
            transform: translate(-5%, -5px);
          }
          100% {
            transform: translate(-5%, 0);
          }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}