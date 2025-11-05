import React from 'react'

export default function InventoryTable({ items, onDelete, onUpdate }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Inventory</h2>
        <span className="text-sm text-gray-500">{items.length} items</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Price</th>
              <th className="text-right p-3">Stock</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{p.name}</td>
                <td className="p-3 text-gray-600">{p.category || '-'}</td>
                <td className="p-3 text-right">${Number(p.price).toFixed(2)}</td>
                <td className="p-3 text-right">{p.stock}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdate(p.id, { stock: Math.max(0, p.stock - 1) })}
                      className="px-2 py-1 text-xs rounded-md border hover:bg-gray-100"
                      title="Decrease stock"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => onUpdate(p.id, { stock: p.stock + 1 })}
                      className="px-2 py-1 text-xs rounded-md border hover:bg-gray-100"
                      title="Increase stock"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-2 py-1 text-xs rounded-md border text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
