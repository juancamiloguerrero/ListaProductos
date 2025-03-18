import Boxprincipal from "../elements/icons/Boxprincipal";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-8 bg-gray-100 rounded-2xl shadow-md">
      <div className="flex items-center gap-4">
          <Boxprincipal />
         <div>
          <h1 className="text-4xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 text-md">Administrar catalogo de productos.</p>
        </div>
      </div>
      <button className="bg-gray-800 text-white cursor-pointer px-4 py-2 rounded-lg shadow-md hover:scale-102 active:bg-gray-950 transition transform">
         Añadir +
      </button>

    </header>
  );
  }
  