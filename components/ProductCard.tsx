'use client'

type Props = {
  product: any
  quantity: number
  onAdd: () => void
  onRemove: () => void
}

export default function ProductCard({ product, quantity, onAdd, onRemove }: any) {
  const isSelected = quantity > 0

  return (
    <div className={`bg-white rounded-lg p-4 shadow transition-all duration-200
      ${isSelected ? 'border-2 border-[#02b564] shadow-md' : 'border border-gray-200'}`}
    >
      <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
      <div className="text-sm text-gray-500">{product.category}</div>
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-[#02b564] font-bold mb-2">Rp{product.price}</p>

      <div className="flex items-center justify-between">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button onClick={onRemove} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">−</button>
            <span>{quantity}</span>
            <button onClick={onAdd} className="bg-[#02b564] text-white px-2 py-1 rounded">+</button>
          </div>
        ) : (
          <button onClick={onAdd} className="w-full bg-[#02b564] text-white py-1 rounded text-sm font-medium">
            Tambah
          </button>
        )}
      </div>
    </div>
  )
}

