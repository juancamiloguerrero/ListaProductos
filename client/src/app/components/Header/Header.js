export default function Header() {
    return (
      <header className="flex justify-between items-center p-12 bg-gray-100 rounded-2xl shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lista de procutos</h1>
          <p className="text-gray-600 text-sm">Administra tu catalogo de productos.</p>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 active:bg-gray-900 transition">
          Añadir +
        </button>
      </header>
    );
  }
  