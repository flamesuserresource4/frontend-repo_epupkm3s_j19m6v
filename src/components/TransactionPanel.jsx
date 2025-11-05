import React, { useMemo, useState } from 'react'

export default function TransactionPanel({ items, onSubmitTx }) {
  const [form, setForm] = useState({ product_id: '', type: 'purchase', quantity: 1, unit_price: 0, note: '' })
  const [loading, setLoading] = useState(false)

  const selected = useMemo(() => items.find(i => String(i.id) === String(form.product_id)), [items, form.product_id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'quantity' || name === 'unit_price' ? Number(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.product_id) return
    setLoading(true)
    try {
      await onSubmitTx({ ...form, product_id: Number(form.product_id) })
      setForm({ product_id: '', type: 'purchase', quantity: 1, unit_price: 0, note: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Record Transaction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <select
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
          className="md:col-span-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Select product</option>
          {items.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="purchase">Purchase</option>
          <option value="sale">Sale</option>
        </select>
        <input
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Qty"
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="unit_price"
          type="number"
          min="0"
          step="0.01"
          value={form.unit_price}
          onChange={handleChange}
          placeholder="Unit Price"
          className="md:col-span-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Note (optional)"
          className="md:col-span-6 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {selected && (
          <div className="md:col-span-6 text-xs text-gray-500 -mt-2">
            Current stock: <span className="font-medium text-gray-700">{selected.stock}</span>
            {form.type === 'sale' && form.quantity > selected.stock && (
              <span className="text-red-600 ml-2">Insufficient stock</span>
            )}
          </div>
        )}
        <div className="md:col-span-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Transaction'}
          </button>
        </div>
      </form>
    </div>
  )
}
