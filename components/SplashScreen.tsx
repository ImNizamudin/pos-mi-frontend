'use client'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 2000) // 2 detik
    return () => clearTimeout(timeout)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="text-4xl font-bold text-[#02b564] animate-pulse mb-2">POS-Mi</div>
      <p className="text-gray-500 text-sm">Point of Sale Mini System</p>
    </div>
  )
}
