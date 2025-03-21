"use client"

import React, { useEffect } from 'react'
import H1 from './components/H1'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}){

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='text-center py-24'>
      <H1 className='mb-5'>Something went wrong!</H1>
      <p>{error.message}</p>
      <button className='hover:scale-105 transition'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  )
}
