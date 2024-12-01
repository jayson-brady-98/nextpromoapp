import { SearchBar } from '@/components/search-bar'
import { PopularSearches } from '@/components/popular-searches'
import { Footer } from '@/components/footer'
import { BackgroundPattern } from '@/components/background-pattern'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">
              nextpromo.io
            </h1>
            <h2 className="text-sm md:text-base font-medium text-gray-700">
              Empowering consumers
            </h2>
          </div>
          <div>
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

