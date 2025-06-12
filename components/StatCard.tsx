export default function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-transform hover:scale-[1.02] cursor-pointer">
      <div className="text-2xl">{icon}</div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold text-[#02b564]">{value}</p>
    </div>
  )
}
