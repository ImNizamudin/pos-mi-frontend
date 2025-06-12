'use client'

import { logoutCashier } from '@/lib/auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Box,
  ShoppingCart,
  ListOrdered,
  User,
} from 'lucide-react'

const menu = [
  { href: '/', label: 'Dasbor', icon: Home },
  { href: '/inventory', label: 'Inventory', icon: Box },
  { href: '/order', label: 'Kasir', icon: ShoppingCart },
  { href: '/sales', label: 'Penjualan', icon: ListOrdered },
  { href: '/cashiers', label: 'Kasir Admin', icon: User }
]

export default function Sidebar() {
  const path = usePathname()

  return (
    <aside className="w-64 h-screen bg-white border-r p-4 space-y-2">
      <h1 className="text-3xl font-bold mb-4 text-[#02b564]">POS-Mi@1.0</h1>
      <nav className="space-y-1">
        {menu.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/'
            ? path === '/'
            : path.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-[#02b564]/10 transition ${
                isActive ? 'bg-[#02b564]/20 text-[#02b564] font-semibold' : 'text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
        <button
          onClick={() => {
            logoutCashier()
            window.location.href = '/login'
          }}
          className="w-full mt-6 text-sm text-red-500 hover:underline"
        >
          Keluar / Logout
        </button>
      </nav>
    </aside>
  )
}
