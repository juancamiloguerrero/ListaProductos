"use client";

import React, { useState } from "react";
export default function CreateProductDialog({ open, onOpenChange, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "0",
    imageUrl: "",
    category: "Other",
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, inStock: !formData.inStock });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: new Date().getTime().toString(), ...formData });
    setFormData({
      name: "",
      description: "",
      price: "0",
      imageUrl: "",
      category: "Other",
      inStock: true,
    });
    onOpenChange(false);
  };

  return open ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 dark:bg-black/80">

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative border border-gray-200">
        <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#000" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" strokeWidth={0.5} stroke="#000"></path></svg>
        </button>
        <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
        <p className="text-sm text-gray-600 mb-4">Fill in the details to create a new product.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Product Name *" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description *" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
          <div className="flex items-center gap-2">
            <input type="number" name="price" min="0" value={formData.price} onChange={handleChange} className="p-2 border rounded w-full" required />
            <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <input type="text" name="imageUrl" placeholder="https://example.com/image.jpg" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" />
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={formData.inStock} onChange={handleCheckboxChange} className="hidden" />
              <div className={`w-6 h-6 flex items-center justify-center border-2 rounded ${formData.inStock ? 'bg-black border-black' : 'border-gray-400'}`}>
                {formData.inStock && <span className="text-white font-bold">✔</span>}
              </div>
            </label>
            <span>In Stock</span>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => onOpenChange(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
