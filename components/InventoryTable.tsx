'use client'

import { useEffect, useState } from 'react'
import { fetchProducts, getStock, updateStock } from '@/lib/api'
import Spinner from '@/components/Spinner'
import Link from 'next/link'

export default function InventoryTable() {
  const [products, setProducts] = useState<any[]>([])
  const [stockMap, setStockMap] = useState<Record<string, number>>({})
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const prods = await fetchProducts()
      setProducts(prods)

      const stockObj: Record<string, number> = {}
      for (const p of prods) {
        const stock = await getStock(p.id)
        stockObj[p.id] = stock
      }
      setStockMap(stockObj)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Spinner />

  const handleEdit = (id: string, value: string) => {
    setEditing(prev => ({ ...prev, [id]: value }))
  }

  const handleUpdate = async (id: string) => {
    const newStock = parseInt(editing[id])
    if (!isNaN(newStock)) {
      await updateStock({ productId: id, stock: newStock })
      setStockMap(prev => ({ ...prev, [id]: newStock }))
      setEditing(prev => {
        const { [id]: _, ...rest } = prev
        return rest
      })
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Inventory</h1>
        <Link
          href="/inventory/add"
          className="px-4 py-2 rounded bg-[#02b564] text-white text-sm font-medium hover:bg-[#029956] transition"
        >
          + Add Product
        </Link>
      </div>
      <h2 className="text-xl font-bold mb-4">Daftar Produk & Stok</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Stok</th>
            <th className="p-2 border">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">Rp{p.price}</td>
              <td className="p-2 border">
                {editing[p.id] !== undefined ? (
                  <input
                    type="number"
                    value={editing[p.id]}
                    onChange={e => handleEdit(p.id, e.target.value)}
                    className="border rounded px-1 w-16"
                  />
                ) : (
                  stockMap[p.id] ?? '...'
                )}
              </td>
              <td className="p-2 border">
                {editing[p.id] !== undefined ? (
                  <button onClick={() => handleUpdate(p.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                    Simpan
                  </button>
                ) : (
                  <button onClick={() => handleEdit(p.id, String(stockMap[p.id]))} className="text-blue-600">
                    Ubah
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
