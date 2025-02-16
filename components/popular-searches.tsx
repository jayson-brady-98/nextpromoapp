'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { popularSearches } from '../lib/sample-data'
import { TrendingUp } from 'lucide-react'
import { fetchPreviousSales } from '@/lib/api/previousSales'

export function PopularSearches() {
  const router = useRouter()
  const [loadingSearch, setLoadingSearch] = useState<string | null>(null)

  const handleClick = async (search: string) => {
    setLoadingSearch(search)
    
    try {
      const searchTerm = search.trim().toLowerCase()
      const previousSales = await fetchPreviousSales(searchTerm)
      
      if (previousSales && previousSales.length > 0) {
        // If the brand exists in previous_sales, show advertisement
        await router.push(`/advertisement/${searchTerm}`)
      } else {
        // If brand doesn't exist, go directly to results
        await router.replace(`/results/${searchTerm}`)
      }
      
      setLoadingSearch(null)
    } catch (error) {
      setLoadingSearch(null)
      console.error('Navigation error:', error)
    }
  }

  return (
    <div className="mt-8">
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
      <div className="flex justify-center">
        <div className="flex flex-nowrap items-center gap-3 overflow-x-auto whitespace-nowrap pb-2">
          <span className="text-[#D2CAA6] font-semibold">Try:</span>
          {popularSearches.map((search: string) => (
            <button
              key={search}
              onClick={() => handleClick(search)}
              disabled={loadingSearch !== null}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full bg-sky-100/80 backdrop-blur-sm
                         hover:bg-sky-200/80 disabled:opacity-75
                         transition-all duration-300 text-gray-800 text-sm sm:text-base
                         relative ${loadingSearch === search ? 'pl-8 sm:pl-10' : ''}`}
            >
              {loadingSearch === search && (
                <TrendingUp className="absolute inset-y-0 left-3 sm:left-4 my-auto w-3 h-3 sm:w-4 sm:h-4 vibrate-once" />
              )}
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

