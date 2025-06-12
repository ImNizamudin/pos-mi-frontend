'use client'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Sen', orders: 120, revenue: 200000 },
  { day: 'Sel', orders: 95, revenue: 150000 },
  { day: 'Rab', orders: 180, revenue: 250000 },
  { day: 'Kam', orders: 356, revenue: 480000 },
  { day: 'Jum', orders: 210, revenue: 300000 },
  { day: 'Sab', orders: 190, revenue: 220000 },
  { day: 'Min', orders: 140, revenue: 180000 }
]

export default function DashboardChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Revenue Chart (Line) */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Total Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis tickFormatter={(v) => `Rp${v / 1000}k`} />
            <Tooltip formatter={(v) => `Rp${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="#02b564" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Chart (Bar) */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">Order Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#02b564" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
