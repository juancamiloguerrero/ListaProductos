"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import CreateProductDialog from "./create-product-dialog";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    setDialogOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="space-y-6 mt-6 p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Lista de Productos</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-500 transition"
          onClick={() => setDialogOpen(true)}
        >
          Añadir Producto
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No hay productos aún. Añade uno.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
          ))}
        </div>
      )}

      <CreateProductDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleAddProduct} />
    </div>
  );
}
