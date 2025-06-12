'use client'

import { useEffect, useState } from 'react'
import { getCashiers } from '@/lib/api'
import Spinner from '@/components/Spinner'
import { logoutCashier } from '@/lib/auth'

export default function CashierTable() {
  const [cashiers, setCashiers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCashiers().then(data => {
      setCashiers(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="bg-white p-4 rounded shadow animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Daftar Kasir</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {cashiers.map(cashier => (
            <tr key={cashier.id}>
              <td className="p-2 border">{cashier.id}</td>
              <td className="p-2 border">{cashier.name}</td>
              <td className="p-2 border">{cashier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
