'use client'

import { useState } from 'react'
import { createProductWithStock } from '@/lib/api'

export default function AddProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image_url: '',
    stock: ''
  })
  const [loading, setLoading] = useState(false)

  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSuccess(null)
    setLoading(true)

    try {
      const result = await createProductWithStock({
        name: form.name,
        price: parseInt(form.price),
        category: form.category,
        image_url: form.image_url,
        stock: parseInt(form.stock)
      })

      setSuccess(`✅ Produk "${form.name}" berhasil ditambahkan dengan ID ${result.id} dan stok ${form.stock} unit.`)
      setForm({ name: '', price: '', category: '', image_url: '', stock: '' })
    } catch (err) {
      setSuccess('❌ Gagal menambahkan produk.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Tambah Produk + Stok</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        placeholder="Nama Produk"
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02b564] transition"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Harga"
        value={form.price}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02b564] transition"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Kategori"
        value={form.category}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02b564] transition"
        required
      />

      <input
        type="text"
        name="image_url"
        placeholder="URL Gambar (opsional)"
        value={form.image_url}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02b564] transition"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stok Awal"
        value={form.stock}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02b564] transition"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full flex justify-center items-center gap-2 py-2 rounded font-medium transition ${
          loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#02b564] text-white hover:bg-[#029956]'
        }`}
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {loading ? 'Mengirim...' : 'Simpan Produk'}
      </button>

      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  )
}
