'use client'

import { useEffect, useState } from 'react'
import { getSales } from '@/lib/api'
import Link from 'next/link'
import Spinner from '@/components/Spinner'
export default function SalesTable() {
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   getSales().then(setSales)
  // }, [])

  useEffect(() => {
    getSales().then(data => {
      setSales(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Riwayat Penjualan</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Sale ID</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Kasir</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td className="p-2 border">{sale.id}</td>
              <td className="p-2 border">{new Date(sale.sale_time).toLocaleString()}</td>
              <td className="p-2 border">{sale.cashier_id}</td>
              <td className="p-2 border">Rp{sale.total}</td>
              <td className="p-2 border">
                <Link
                  href={`/sales/receipt?saleId=${sale.id}`}
                  className="text-blue-600 underline"
                >
                  Lihat Struk
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
