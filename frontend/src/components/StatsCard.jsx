import React from 'react'

const StatsCard = ({title, value, sub}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  )
}

export default StatsCard