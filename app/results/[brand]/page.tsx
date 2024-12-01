import { sampleBrands } from '@/lib/sample-data'
import { SearchBar } from '@/components/search-bar'
import { Footer } from '@/components/footer'
import { BackgroundPattern } from '@/components/background-pattern'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Calendar, Percent, TrendingUp } from 'lucide-react'

export default function ResultsPage({ params }: { params: { brand: string } }) {
  const brandData = sampleBrands[params.brand.toLowerCase()]

  if (!brandData) {
    return (
      <div className="min-h-screen flex flex-col">
        <BackgroundPattern />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              Oh no, sorry but we haven&apos;t added {params.brand} to our database yet
            </h1>
            <p className="text-xl mb-8">
              If you want to see this added, let us know here and we&apos;ll add it for you!
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-lg text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Try another search
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <main className="flex-grow">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              New search
            </Link>
            <Image
              src={brandData.logoUrl}
              alt={`${brandData.name} logo`}
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </div>

          <section className="mb-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Next Sale Prediction</h2>
              <p className="text-xl opacity-90">Powered by coffee and the cost of living crisis</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center">
                  <Calendar className="w-12 h-12 text-orange-500 mr-4" />
                  <div>
                    <p className="text-2xl font-bold">{brandData.nextSale.date}</p>
                    <p className="text-gray-600">Potential starting date</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Percent className="w-12 h-12 text-purple-600 mr-4" />
                  <div>
                    <p className="text-2xl font-bold">{brandData.nextSale.discount}% off</p>
                    <p className="text-gray-600">Most likely discount</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-12 h-12 text-sky-500 mr-4" />
                  <div>
                    <p className="text-2xl font-bold">{brandData.nextSale.probability}%</p>
                    <p className="text-gray-600">Probability of sale</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Previous {brandData.name} Sales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brandData.previousSales.map((sale, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm
                             shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-3xl font-bold mb-2">{sale.discount}% off</div>
                  <div className="text-gray-800">{sale.event}</div>
                  <div className="text-gray-600">{sale.date}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

