'use client'

import { useRouter } from 'next/navigation'
import { popularSearches } from '@/lib/sample-data'
import { sampleBrands } from '@/lib/sample-data'

export function PopularSearches() {
  const router = useRouter()

  const handleClick = (search: string) => {
    const normalizedSearch = search.toLowerCase()
    if (sampleBrands[normalizedSearch]) {
      router.push(`/ad/${normalizedSearch}`)
    } else {
      router.push(`/results/${normalizedSearch}`)
    }
  }

  return (
    <div className="mt-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-[#D2CAA6] font-semibold">Popular searches:</span>
        {popularSearches.map((search) => (
          <button
            key={search}
            onClick={() => handleClick(search)}
            className="px-6 py-2 rounded-full bg-sky-100/80 backdrop-blur-sm
                       hover:bg-sky-200/80
                       transition-all duration-300 text-gray-800"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

