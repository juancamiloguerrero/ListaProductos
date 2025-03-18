import Boxprincipal from "../elements/icons/Boxprincipal";
import AddProductButton from "../elements/addProductButton";

export default function Header({ onAddProduct, hasProducts }) {
  return (
    <header className="flex justify-between items-center py-8 px-12 bg-gray-100 rounded-2xl">
      <div className="flex items-center gap-4">
        <Boxprincipal />
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 text-md">Administrar catálogo de productos.</p>
        </div>
      </div>
      {hasProducts && <AddProductButton onClick={onAddProduct} />}
    </header>
  );
}
