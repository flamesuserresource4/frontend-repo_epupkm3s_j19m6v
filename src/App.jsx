import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductForm from './components/ProductForm'
import InventoryTable from './components/InventoryTable'
import TransactionPanel from './components/TransactionPanel'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totals = useMemo(() => {
    const count = items.length
    const stock = items.reduce((sum, i) => sum + Number(i.stock || 0), 0)
    const value = items.reduce((sum, i) => sum + Number(i.stock || 0) * Number(i.price || 0), 0)
    return { count, stock, value }
  }, [items])

  const loadItems = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/products`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError('Failed to load data from backend')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const createItem = async (payload) => {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to create')
    await loadItems()
  }

  const updateItem = async (id, payload) => {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('Failed to update')
    await loadItems()
  }

  const deleteItem = async (id) => {
    const res = await fetch(`${API_BASE}/api/products/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete')
    await loadItems()
  }

  const submitTx = async (payload) => {
    const res = await fetch(`${API_BASE}/api/transactions/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const msg = await res.json().catch(() => ({}))
      throw new Error(msg?.detail || 'Failed to save transaction')
    }
    await loadItems()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      <Header />

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="text-sm text-gray-500">Products</div>
            <div className="text-2xl font-semibold">{totals.count}</div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="text-sm text-gray-500">Total Stock</div>
            <div className="text-2xl font-semibold">{totals.stock}</div>
          </div>
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <div className="text-sm text-gray-500">Inventory Value</div>
            <div className="text-2xl font-semibold">${totals.value.toFixed(2)}</div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4 lg:col-span-1">
            <ProductForm onCreate={createItem} />
            <TransactionPanel items={items} onSubmitTx={submitTx} />
          </div>
          <div className="lg:col-span-2">
            {loading ? (
              <div className="h-64 grid place-items-center bg-white rounded-xl border shadow-sm">Loading...</div>
            ) : (
              <InventoryTable items={items} onDelete={deleteItem} onUpdate={updateItem} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
