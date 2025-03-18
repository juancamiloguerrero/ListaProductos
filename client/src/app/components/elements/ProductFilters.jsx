"use client";

export default function ProductFilters({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-sm font-semibold text-gray-700">Ordenar por:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="p-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white hover:bg-gray-50 transition"
      >
        <option value="name">Nombre</option>
        <option value="code">Código</option>
        <option value="quantity">Cantidad</option>
        <option value="date">Fecha de creación</option>
      </select>
    </div>
  );
}