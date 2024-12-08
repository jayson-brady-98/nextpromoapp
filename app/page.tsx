/* eslint-disable @typescript-eslint/no-unused-vars */
import { SearchBar } from '@/components/search-bar'
import { PopularSearches } from '@/components/popular-searches'
import { Footer } from '@/components/footer'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#182A39]">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="mb-16">
            <div className="space-y-1 relative">
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-6.5xl font-bold text-[#E84753]">
                  nextpromo.io
                </h1>
                <span className="absolute top-[-15px] right-[-20px] text-xs font-semibold text-white bg-red-500 rounded-full px-2 py-1">
                  Beta
                </span>
              </div>
              <h2 className="text-sm md:text-base font-medium text-[#D2CAA6] absolute left-[45%] top-[100%] -mt-3">
                Empowering Consumers
              </h2>
            </div>
          </div>
          <div className="mb-16">
            <SearchBar />
          </div>
          <PopularSearches />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

