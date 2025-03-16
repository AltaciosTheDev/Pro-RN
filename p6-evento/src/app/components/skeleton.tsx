import { cn } from '@/lib/utils'
import React from 'react'

type SkeletonProps = {
    className?: string
}

export default function Skeleton({className}: SkeletonProps) {
  return (
    <div className={cn('rounded-md bg-white/5 animate-bounce', className)}></div>
  )
}
