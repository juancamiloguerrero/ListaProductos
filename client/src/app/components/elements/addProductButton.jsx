export default function AddProductButton({ onClick }) {
  return (
    <button
      className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition"
      onClick={onClick}
    >
      Añadir producto +
    </button>
  );
}