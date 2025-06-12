'use client'

import { useEffect, useState } from 'react'
import { getCashiers } from '@/lib/api'
import { setCashier } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function CashierLoginForm() {
  const [cashiers, setCashiers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    getCashiers().then(setCashiers)
  }, [])

  const handleSelect = (cashier: any) => {
    setCashier({ id: cashier.id, name: cashier.name })
    router.push('/order') // redirect ke halaman order
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm animate-fade-in">
        <h2 className="text-2xl font-bold text-[#02b564] mb-4 text-center">Login Kasir</h2>
        <ul className="space-y-2">
          {cashiers.map(c => (
            <li key={c.id}>
              <button
                className="w-full border p-2 rounded hover:bg-gray-100 hover:border-[#02b564] text-left"
                onClick={() => handleSelect(c)}
              >
                {c.name} ({c.email})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
