import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex justify-center items-center p-4 bg-gray-100 rounded-2xl shadow-md mt-6">
          <p className="text-gray-600 text-sm">© 2025 Juan Guerrero</p>
          <span className="mx-2 text-gray-500">•</span>
          <Link 
            href="https://github.com/juancamiloguerrero/ListaProductos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 text-sm hover:text-gray-900"
          >
            Ver en GitHub
          </Link>
        </footer>
      )
}
