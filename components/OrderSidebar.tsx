// 'use client'

// type Props = {
//   selectedItems: { product: any, quantity: number }[]
//   onSubmit: () => void
//   total: number
// }

// export default function OrderSidebar({ selectedItems, onSubmit, total }: Props) {
//   return (
//     <aside className="w-80 bg-white border-l p-4">
//       <h2 className="font-bold text-lg mb-2">Order List</h2>
//       <ul className="space-y-1">
//         {selectedItems.map(item => (
//           <li key={item.product.id} className="flex justify-between">
//             <span>{item.product.name} x{item.quantity}</span>
//             <span>Rp{item.product.price * item.quantity}</span>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4 font-semibold text-right">Total: Rp{total}</div>
//       <button onClick={onSubmit} className="mt-4 w-full bg-green-600 text-white py-2 rounded">
//         Kirim Pesanan
//       </button>
//     </aside>
//   )
// }

export default function OrderSidebar({ cart, products, onSubmit, isLoading }: any) {
  const selectedItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p: any) => p.id === id)
    return { ...product, quantity: qty }
  })

  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="w-80 bg-white p-4 rounded shadow h-fit sticky top-6">
      <h3 className="text-lg font-bold mb-4">Order</h3>
      <ul className="space-y-2">
        {selectedItems.map(item => (
          <li key={item.id} className="flex justify-between text-sm">
            <span>{item.name} x{item.quantity}</span>
            <span>Rp{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <div className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>Rp{total}</span>
      </div>

      <button
        className={`mt-4 w-full py-2 rounded font-medium flex items-center justify-center gap-2 transition ${
          isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#02b564] text-white hover:bg-[#029956]'
        }`}
        onClick={onSubmit}
        disabled={isLoading || selectedItems.length === 0}
      >
        {isLoading && (
          <svg className="w-4 h-4 animate-spin text-gray-600" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {isLoading ? 'Mengirim...' : 'Pesan'}
      </button>
    </div>
  )
}

