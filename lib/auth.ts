export const CASHIER_KEY = 'posmi_cashier'

export function setCashier(cashier: { id: string, name: string }) {
  localStorage.setItem(CASHIER_KEY, JSON.stringify(cashier))
}

export function getCashier() {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem(CASHIER_KEY)
  return data ? JSON.parse(data) : null
}

export function clearCashier() {
  localStorage.removeItem(CASHIER_KEY)
}

// ------------------------------------------------------------------

export function logoutCashier() {
  localStorage.removeItem('cashier')
}

