'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { popularSearches } from '../lib/sample-data'
import { fetchPredictions } from '@/lib/api/prediction'
import { TrendingUp } from 'lucide-react'

export function PopularSearches() {
  const router = useRouter()
  const [loadingSearch, setLoadingSearch] = useState<string | null>(null)

  const handleClick = async (search: string) => {
    setLoadingSearch(search)
    
    try {
      const searchTerm = search.trim().toLowerCase()
      const prediction = await fetchPredictions(searchTerm)
      
      if (prediction) {
        const essentialData = {
          brand_name: prediction.brand_name,
          sale_start_date: prediction.sale_start_date,
          sale_end_date: prediction.sale_end_date,
          event: prediction.event
        }
        
        sessionStorage.setItem('fullPredictionData', JSON.stringify(prediction))
        
        router.push(`/advertisement/${searchTerm}?data=${encodeURIComponent(JSON.stringify(essentialData))}`)
      } else {
        router.replace(`/results/${searchTerm}`)
      }
    } finally {
      setLoadingSearch(null)
    }
  }

  return (
    <div className="mt-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-[#D2CAA6] font-semibold">Popular searches:</span>
        {popularSearches.map((search: string) => (
          <button
            key={search}
            onClick={() => handleClick(search)}
            disabled={loadingSearch !== null}
            className={`px-6 py-2 rounded-full bg-sky-100/80 backdrop-blur-sm
                       hover:bg-sky-200/80 disabled:opacity-75
                       transition-all duration-300 text-gray-800
                       ${loadingSearch === search ? 'relative pl-10' : ''}`}
          >
            {loadingSearch === search && (
              <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" />
            )}
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

