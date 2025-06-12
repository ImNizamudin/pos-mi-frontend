
# 📘 Dokumentasi API POS-Mi

## ✅ 1. Product Service (MongoDB)

### 🔹 Tambah Produk
- **Endpoint:** `POST /products`
- **URL:** `http://localhost:8080/products`

#### Request Body
```json
{
  "id": "prod-001",
  "name": "Indomie Goreng",
  "price": 3500,
  "category": "makanan",
  "image_url": "/img/indomie.jpg"
}
```

#### Response
```json
{
  "message": "Product created",
  "product": { ... }
}
```

#### MongoDB Fields
| Field       | Type   |
|-------------|--------|
| id          | String |
| name        | String |
| price       | Number |
| category    | String |
| image_url   | String |

---

### 🔹 Ambil Semua Produk
- **Endpoint:** `GET /products`

---

## ✅ 2. Inventory Service (Redis)

### 🔹 Set Stok Awal
- **Endpoint:** `POST /inventory`

#### Request
```json
{
  "product_id": "prod-001",
  "stock": 50
}
```

#### Response
```json
{
  "message": "Stock set"
}
```

### 🔹 Ambil Semua Inventory
- **Endpoint:** `GET /inventory`

### 🔹 Update Stok (Kurangi Saat Order)
- **Endpoint:** `POST /inventory/decrease`

#### Request
```json
{
  "productId": "prod-001",
  "quantity": 2
}
```

---

## ✅ 3. Sales Service (PostgreSQL)

### 🔹 Buat Penjualan
- **Endpoint:** `POST /sales`

#### Request
```json
{
  "cashier_id": "kasir-001",
  "total": 14000,
  "items": [
    { "product_id": "prod-001", "quantity": 2, "price_each": 3500 }
  ]
}
```

#### Response
```json
{
  "saleId": 1
}
```

#### Table: sales
| Field        | Type    |
|--------------|---------|
| id           | Serial  |
| cashier_id   | String  |
| sale_time    | Date    |
| total        | Integer |

#### Table: sale_items
| Field        | Type    |
|--------------|---------|
| sale_id      | Integer |
| product_id   | String  |
| quantity     | Integer |
| price_each   | Integer |

### 🔹 Ambil Semua Penjualan
- `GET /sales`

### 🔹 Ambil Detail Penjualan
- `GET /sales?saleId=1`

#### Response
```json
{
  "id": 1,
  "cashier_id": "kasir-001",
  "sale_time": "2025-06-11T09:00:00Z",
  "total": 14000,
  "items": [
    { "product_id": "prod-001", "quantity": 2, "price_each": 3500 }
  ]
}
```

---

## ✅ 4. Receipt Service

### 🔹 Simpan Struk
- **Endpoint:** `POST /receipts`

#### Request
```json
{
  "saleId": 1,
  "timestamp": "10 Juni 2025 09.00.00",
  "cashier": "Budi",
  "items": [
    { "product": "Indomie Goreng", "quantity": 2, "price": 3500 }
  ],
  "total": 14000
}
```

---

## ✅ 5. Frontend Routes (Next.js)

| Halaman             | Request & Method                              |
|---------------------|-----------------------------------------------|
| `/inventory`        | `GET /products`, `GET /inventory`             |
| `/inventory/add`    | `POST /products`, `POST /inventory`           |
| `/order`            | `GET /products`, `POST /sales`, `POST /inventory/decrease`, `POST /receipts` |
| `/sales`            | `GET /sales`                                  |
| `/sales/receipt`    | `GET /sales?saleId=1`                         |
| `/login`            | `setCashier()`                                |
| `/logout`           | `logoutCashier()`                             |
