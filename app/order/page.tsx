'use client'
import { useEffect, useState } from 'react'
import { fetchProducts, createSale, decreaseStock, createReceipt } from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import OrderSidebar from '@/components/OrderSidebar'
import { getCashier } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'

export default function OrderPage() {
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<Record<string, number>>({})
//   const [cashierId] = useState('123') // hardcoded sementara
    const [cashierId, setCashierId] = useState('')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
      const cashier = getCashier()
      if (!cashier) {
          router.push('/login') // redirect jika belum login
      } else {
          setCashierId(cashier.id) // set id untuk transaksi
      }
  }, [])

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />

  const handleAdd = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const handleRemove = (id: string) => {
    setCart(prev => {
      const newQty = Math.max((prev[id] || 0) - 1, 0)
      if (newQty === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: newQty }
    })
  }

  const selectedItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find(p => p.id === id)
      return { product, quantity }
    })

  const total = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const payload = {
        cashier_id: cashierId,
        total,
        items: selectedItems.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price_each: item.product.price
        }))
      }

      const res = await createSale(payload)
      const saleId = res.saleId

      // 🔻 Kurangi stok untuk setiap item
      for (const item of selectedItems) {
          await decreaseStock({
              productId: item.product.id,
              quantity: item.quantity
          })
      }

      const timestamp = new Date().toLocaleString('id-ID', {
          dateStyle: 'medium',
          timeStyle: 'medium'
      })

      const receipt = {
          saleId,
          timestamp: timestamp,
          cashier: getCashier()?.name || 'Kasir Tidak Dikenal',
          total,
          items: selectedItems.map(item => ({
              product: item.product.name,
              quantity: item.quantity,
              price: item.product.price
          }))
      }

      await createReceipt(receipt)

      alert(`✅ Pesanan dikirim. ID: ${res.saleId}`)
      setCart({})
    } catch (error) {
      console.error(error)
      alert('❌ Gagal membuat pesanan.')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Menu Tersedia</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in p-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onAdd={() => handleAdd(product.id)}
              onRemove={() => handleRemove(product.id)}
            />
          ))}
        </div>
      </div>

      <OrderSidebar
        cart={cart}
        products={products}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
