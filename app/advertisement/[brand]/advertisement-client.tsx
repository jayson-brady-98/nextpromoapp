'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/footer'
import { Loader } from 'lucide-react'

interface AdvertisementClientProps {
  brand: string;
  brandData: any;
}

export function AdvertisementClient({ brand, brandData }: AdvertisementClientProps) {
  const router = useRouter()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/results/${brand}`)
    }, 10000)

    return () => clearTimeout(timer)
  }, [router, brand])
  
  return (
    <div className="min-h-screen flex flex-col bg-[#182A39]">
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <main className="flex-grow flex flex-col items-center p-4 gap-4">
        <div className="w-full max-w-2xl mx-auto text-center pt-6">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-[#E4434B] mb-4">
              Getting <span className="text-[#b39a55]">{decodeURIComponent(brand).replace(/\b\w/g, (c) => c.toUpperCase())}&apos;s</span> discount history
            </h1>
            <div className="flex flex-col items-center gap-4">
              <Loader className="w-8 h-8 text-[#D2CAA6] spinner" />
              <p className="text-[#D2CAA6] text-lg">
                This should take no longer than 10 seconds
              </p>
            </div>
          </div>
        </div>

        {/* Advertisement Placeholder */}
        <div className="w-full max-w-4xl mx-auto">
          <a href="https://getprinternet.com" target="_blank" rel="noopener noreferrer">
            {/* Desktop Image */}
            <img 
              src="/adCreatives/printernetDesktop.png"
              alt="Print Advertisement"
              className="hidden md:block w-full object-contain rounded-lg cursor-pointer"
            />
            {/* Mobile Image */}
            <img 
              src="/adCreatives/printernetMobile.png"
              alt="Print Advertisement"
              className="block md:hidden w-full object-contain rounded-lg cursor-pointer"
            />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
} 