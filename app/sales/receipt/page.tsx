'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSaleById, fetchProducts } from '@/lib/api'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'


export default function ReceiptPage() {
  const searchParams = useSearchParams()
  const saleId = searchParams.get('saleId')
  const [data, setData] = useState<any>(null)
  const [productsMap, setProductsMap] = useState<Record<string, string>>({})

  useEffect(() => {
    if (saleId) {
      async function loadData() {
        const [sale, products] = await Promise.all([
          getSaleById(saleId as string),
          fetchProducts()
        ])

        const map: Record<string, string> = {}
        for (const p of products) {
          map[p.id] = p.name
        }

        setProductsMap(map)
        setData(sale)
      }

      loadData()
    }
  }, [saleId])

  if (!data) return <p className="p-6">Memuat struk...</p>

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="bg-white rounded shadow p-4 hover:shadow-md transition">
        <h2 className="text-xl font-bold mb-2">Struk Penjualan</h2>
        <p><strong>ID Transaksi:</strong> {data.id}</p>
        <p><strong>ID Kasir:</strong> {data.cashier_id}</p>
        <p><strong>Tanggal:</strong> {new Date(data.sale_time).toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'medium'
        })}</p>

        <hr className="my-4" />

        <ul className="mb-4">
          {data.items.map((item: any, idx: number) => (
            <li key={idx} className="flex justify-between">
              <span>{productsMap[item.product_id] || item.product_id} x{item.quantity}</span>
              <span>Rp{item.price_each}</span>
            </li>
          ))}
        </ul>

        <hr />
        <p className="text-right font-bold mt-2">Total: Rp{data.total}</p>
      </div>

      <Link
        href="/sales"
        className="mt-6 inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Riwayat
      </Link>
    </div>
  )
}
