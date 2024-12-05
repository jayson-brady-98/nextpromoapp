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
      router.push(`/results/${query.toLowerCase()}`)
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
                     text-[#182A39] text-[1rem] leading-[1.5] align-middle pt-2
                     placeholder:text-[#182A39]/60 placeholder:text-[1rem] placeholder:leading-[1.5] placeholder:align-middle
                     placeholder:pt-2
                     focus:ring-2 focus:ring-[#AF9550]/20 focus:border-[#AF9550]/50"
          style={{ lineHeight: '1' }}
          placeholder="Search for a brand..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 rounded-full 
                     bg-[#E84753] hover:bg-[#E84753]/90 text-white/90
                     transition-all duration-300"
        >
          Search brand
        </Button>
      </div>
    </form>
  )
}

