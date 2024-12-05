'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type AdPageProps = {
  params: {
    brand: string
  };
};

export async function generateStaticParams() {
  // Replace with your logic to fetch available brands
  const brands = ['brand1', 'brand2', 'brand3']; // Example brands
  return brands.map((brand) => ({ brand }));
}

export default function AdPage({ params }: AdPageProps) {
  const brand = params.brand
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          router.push(`/results/${brand}`)
          return 0
        }
        return prevCount - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [router, brand])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#182A39]">
      <div className="w-full max-w-4xl p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 aspect-video flex items-center justify-center">
          <p className="text-2xl text-gray-400">Advertisement Placeholder</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-lg text-[#D2CAA6]">
            Results coming in... {countdown}
          </p>
        </div>
      </div>
    </div>
  )
}

