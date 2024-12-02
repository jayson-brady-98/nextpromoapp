'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { sampleBrands } from '@/lib/sample-data'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const normalizedQuery = query.toLowerCase()
      if (sampleBrands[normalizedQuery]) {
        router.push(`/ad/${normalizedQuery}`)
      } else {
        router.push(`/results/${normalizedQuery}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          className="h-14 pl-10 pr-32 rounded-full text-lg bg-white/80 backdrop-blur-sm border-0 shadow-lg 
                     bg-gradient-to-r from-orange-500/10 to-purple-500/10 hover:from-orange-500/20 hover:to-purple-500/20
                     transition-all duration-300"
          placeholder="Search for a brand..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 rounded-full 
                     bg-gradient-to-r from-orange-500 to-purple-600 text-white
                     hover:from-orange-600 hover:to-purple-700 transition-all duration-300"
        >
          Search brand
        </Button>
      </div>
    </form>
  )
}

