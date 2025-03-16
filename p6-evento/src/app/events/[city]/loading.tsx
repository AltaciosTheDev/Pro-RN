import SkeletonCard from '@/app/components/skeleton-card'
import React from 'react'

export default function LoadingCity() {
  return (
    <div className='flex flex-wrap justify-center max-w-[1100px] mx-auto px-[20px] py-24 gap-20'>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
      <SkeletonCard/>
    </div>
  )
}
