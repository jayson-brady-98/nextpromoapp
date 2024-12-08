'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/footer'

interface AdvertisementClientProps {
  brand: string
}

export function AdvertisementClient({ brand }: AdvertisementClientProps) {
  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/results/${brand}`)
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [router, brand])
  
  return (
    <div className="min-h-screen flex flex-col bg-[#182A39]">
      <main className="flex-grow flex flex-col items-center p-4 gap-8">
        {/* Prediction Text Section */}
        <div className="w-full max-w-2xl mx-auto text-center pt-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#E84753] mb-4">
              We're predicting {decodeURIComponent(brand).replace(/\b\w/g, (c) => c.toUpperCase())}'s next sale for you
            </h1>
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-[#D2CAA6] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#D2CAA6] text-lg">
                This should take no longer than 10 seconds
              </p>
            </div>
          </div>
        </div>

        {/* Advertisement Placeholder */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8" style={{ minHeight: '550px' }}>
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg">
            Advertisement Placeholder
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 