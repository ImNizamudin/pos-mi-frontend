// lib/api.ts

import { nanoid } from 'nanoid'

// const API = 'http://192.168.100.164:8080'
const API = 'http://192.168.43.48:8080'

export async function fetchProducts() {
  const res = await fetch(`${API}/products`)
  return res.json()
}

export async function getReceipt(saleId: string) {
  const res = await fetch(`${API}/receipts/${saleId}`)
  return res.json()
}

// ---------------------------------------------------------------------

export async function createProductWithStock(data: {
  name: string
  price: number
  category: string
  image_url: string
  stock: number
}) {
  const id = `prod-${nanoid(8)}` // contoh: prod-abc123xy

  const productRes = await fetch(`${API}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id, // 👈 kirim ID buatan
      name: data.name,
      price: data.price,
      category: data.category,
      image_url: data.image_url
    })
  })

  const inventoryRes = await fetch(`${API}/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: id, // 👈 pakai ID yang sama
      stock: data.stock
    })
  })

  return {
    id,
    product: await productRes.json(),
    inventory: await inventoryRes.json()
  }
}

// -------------------------------------------------------

export async function getStock(product_id: string) {
  const res = await fetch(`${API}/inventory/${product_id}`)
  const data = await res.json()
  return data.stock || 0
}

export async function updateStock(data: {
  productId: string,
  stock: number
}) {
  const res = await fetch(`${API}/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

// -------------------------------------------------------

export async function getCashiers() {
  const res = await fetch(`${API}/cashiers`)
  return res.json()
}

// -------------------------------------------------------

export async function createSale(data: {
  cashier_id: string,
  total: number,
  items: {
    product_id: string,
    quantity: number,
    price_each: number
  }[]
}) {
  const res = await fetch(`${API}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function decreaseStock(data: {
  productId: string,
  quantity: number
}) {
  const res = await fetch(`${API}/inventory/decrease`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

// -------------------------------------------------------

export async function getSales() {
  const res = await fetch(`${API}/sales`)
  return res.json()
}

// -------------------------------------------------------

export async function createReceipt(data: {
  saleId: number | string,
  timestamp: string,
  cashier: string,
  items: {
    product: string,
    quantity: number,
    price: number
  }[],
  total: number
}) {
  const res = await fetch(`${API}/receipts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

// -------------------------------------------------------

export async function getSaleById(saleId: string) {
  const res = await fetch(`${API}/sales?saleId=${saleId}`)
  return res.json()
}
