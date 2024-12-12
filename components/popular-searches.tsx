'use client'
import { useRouter } from 'next/navigation'
import { popularSearches } from '../lib/sample-data'
import { fetchPredictions } from '@/lib/api/prediction'

export function PopularSearches() {
  const router = useRouter()

  const handleClick = async (search: string) => {
    const searchTerm = search.trim().toLowerCase()
    const prediction = await fetchPredictions(searchTerm)
    
    console.log('PopularSearches - Received prediction:', prediction)
    console.log('PopularSearches - Type of prediction:', typeof prediction)
    console.log('PopularSearches - Is prediction truthy?:', !!prediction)
    
    if (prediction) {
      console.log('PopularSearches - Routing to advertisement page')
      router.push(`/advertisement/${searchTerm}?data=${encodeURIComponent(JSON.stringify(prediction))}`)
    } else {
      console.log('PopularSearches - Routing to results page')
      router.replace(`/results/${searchTerm}`)
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

