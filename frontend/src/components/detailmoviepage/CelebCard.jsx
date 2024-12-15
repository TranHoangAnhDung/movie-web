import React from 'react'

const CelebCard = (data) => {
  return (
    <div className='flex flex-col justify-center items-center w-full mb-10'>
        <img src={data.imageUrl} alt={data.name} width={200} height={200} className='w-4/5 h-full object-cover rounded-full'/>
        <h3 className='text-base font-semibold text-black'>{data.name}</h3>
        <h4 className='text-sm font-normal text-gray-500'>{data.role}</h4>
    </div>
  )
}

export default CelebCard