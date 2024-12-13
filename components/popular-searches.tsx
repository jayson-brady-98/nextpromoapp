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
        
        await router.push(`/advertisement/${searchTerm}?data=${encodeURIComponent(JSON.stringify(essentialData))}`)
      } else {
        await router.replace(`/results/${searchTerm}`)
      }
      
      setLoadingSearch(null)
    } catch (error) {
      setLoadingSearch(null)
      console.error('Navigation error:', error)
    }
  }

  return (
    <div className="mt-8 text-center">
      <style jsx global>{`
        @keyframes singleVibrate {
          0% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .vibrate-once {
          animation: singleVibrate 0.3s ease-in-out;
        }
      `}</style>
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
                       relative ${loadingSearch === search ? 'pl-10' : ''}`}
          >
            {loadingSearch === search && (
              <TrendingUp className="absolute inset-y-0 left-4 my-auto w-4 h-4 vibrate-once" />
            )}
            {search}
          </button>
        ))}
      </div>
    </div>
  )
}

