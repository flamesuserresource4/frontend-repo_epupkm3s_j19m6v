import React from 'react'

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500 text-white grid place-items-center font-bold">G</div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Grocery Manager</h1>
            <p className="text-xs text-gray-500">Track inventory, purchases and sales</p>
          </div>
        </div>
        <a
          href="#"
          className="text-sm text-emerald-700 hover:text-emerald-900 font-medium"
          onClick={(e) => e.preventDefault()}
        >
          SQL + FastAPI + React
        </a>
      </div>
    </header>
  )
}
