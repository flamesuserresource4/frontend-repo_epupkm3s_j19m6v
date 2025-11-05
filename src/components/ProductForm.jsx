import React, { useState } from 'react'

export default function ProductForm({ onCreate }) {
  const [form, setForm] = useState({ name: '', category: '', price: 0, stock: 0, description: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'price' || name === 'stock' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    try {
      await onCreate({ ...form, price: Number(form.price || 0), stock: Number(form.stock || 0) })
      setForm({ name: '', category: '', price: 0, stock: 0, description: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="md:col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="stock"
          type="number"
          min="0"
          step="1"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="md:col-span-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <div className="md:col-span-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
