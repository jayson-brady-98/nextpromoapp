'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { fetchPreviousSales } from '@/lib/api/previousSales'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // adjust breakpoint as needed
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (query.trim()) {
        const searchTerm = query.trim().toLowerCase()
        const previousSales = await fetchPreviousSales(searchTerm)
        
        if (previousSales && previousSales.length > 0) {
          // If the brand exists in previous_sales, show advertisement
          await router.push(`/advertisement/${searchTerm}`)
        } else {
          // If brand doesn't exist, go directly to results
          await router.replace(`/results/${searchTerm}`)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#182A39]/60 w-5 h-5" />
        <Input
          className="h-14 pl-10 pr-32 rounded-full bg-[#D2CAA6] 
                     shadow-inner border border-[#AF9550]/30
                     transition-all duration-300
                     text-[#182A39] !text-base leading-[1.5] align-middle
                     placeholder:text-[#182A39]/60 !placeholder:text-base placeholder:leading-[1.5] placeholder:align-middle
                     focus:ring-2 focus:ring-[#AF9550]/20 focus:border-[#AF9550]/50"
          placeholder={isMobile 
            ? "Find when brands have sales" 
            : "Find when brands have sales"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 rounded-full 
                     bg-[#E84753] hover:bg-[#E84753]/90 text-white/90
                     transition-all duration-300 text-[15px] ${isLoading ? 'opacity-75' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin">↻</span>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </form>
  )
}

