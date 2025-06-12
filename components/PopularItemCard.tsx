export default function PopularItemCard({ name, price, calories, image }: any) {
  return (
    <div className="bg-white rounded shadow p-3 hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer">
      <div className="text-xs text-yellow-500 mb-1">👑 Top of the week</div>
      <img src={image} alt={name} className="w-full h-62 object-cover rounded mb-2" />
      <p className="text-gray-800 font-semibold text-sm">{name}</p>
      <p className="text-xs text-gray-500">{calories} Calories</p>
      <p className="text-[#02b564] font-bold mt-1">Rp {price}</p>
    </div>
  )
}
