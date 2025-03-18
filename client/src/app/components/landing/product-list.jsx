"use client";

import { useState } from "react";
import ProductCard from "./product-card";
import ProductFilters from "../elements/ProductFilters";
import CreateProductDialog from "./create-product-dialog";
import Header from "./header";
import Footer from "./footer";
import AddProductButton from "../elements/addProductButton";
import Plus from "../elements/icons/Plus";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name"); 

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    setDialogOpen(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Función para ordenar los productos según el criterio seleccionado
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "code") {
      return a.code - b.code;
    } else if (sortBy === "quantity") {
      return a.quantity - b.quantity;
    } else if (sortBy === "date") {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  return (
    <div className="mb-24">
      <Header onAddProduct={() => setDialogOpen(true)} hasProducts={products.length > 0} />

      <div className="mt-6 p-6 max-w-6xl mx-auto">
        {/* Agregar el componente de filtros */}
        <ProductFilters sortBy={sortBy} onSortChange={setSortBy} />

        {sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-12 shadow-sm bg-gray-50">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full mb-4">
              <Plus />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Aún no hay productos</h3>
            <p className="text-gray-500 text-center mb-4">Empieza creando tu primer producto. Haz clic en el botón "Añadir producto".</p>
            <AddProductButton onClick={() => setDialogOpen(true)} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
            ))}
          </div>
        )}

        <div className={dialogOpen ? "fixed inset-0 bg-black/40 z-50" : ""}>
          <CreateProductDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={handleAddProduct} />
        </div>
      </div>

      <Footer />
    </div>
  );
}