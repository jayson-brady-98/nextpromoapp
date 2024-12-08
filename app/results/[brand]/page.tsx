import { sampleBrands } from '@/lib/sample-data'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Search, Calendar} from 'lucide-react'

type BrandParams = Promise<{ brand: string }>

export default async function ResultsPage(props: { params: BrandParams }) {
  const params = await props.params
  const brandData = sampleBrands[params.brand.toLowerCase()]

  if (!brandData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#182A39]">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              Sorry, I haven&apos;t added &quot;{decodeURIComponent(params.brand).replace(/\b\w/g, (c) => c.toUpperCase())}&quot; to the database yet
            </h1>
            <p className="text-xl mb-8">
              <a
                href="mailto:jaysonbrady123@gmail.com"
                className="text-[#b39a55] hover:text-[#cfcaa3] transition-colors"
              >
                Shoot me an email
              </a>{" "}
              and I&apos;ll add it asap :)
            </p>
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors"
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
    <div className="min-h-screen flex flex-col bg-[#182A39]">
      <main className="flex-grow">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="mb-8 px-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              New search
            </Link>
          </div>

          <section className="mb-2">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                <div>
                  <h2 className="text-4xl font-bold text-[#E4434B]">Next {brandData.name} Sale:</h2>
                  <p className="text-[#CFCAA3] text-sm italic mt-0">
                    Powered by coffee and discontent
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-14 h-14 text-[#b39a55]" />
                  <div className="text-left">
                    <p className="text-3xl font-bold text-[#b39a55]">{brandData.nextSale.date}*</p>
                    <p className="text-[#CFCAA3]">{brandData.nextSale.probability}% probability of sale</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6 text-[#E4434B]">Previous {brandData.name} Sales</h2>
              <div className="divide-y divide-[#b39a55]">
                {brandData.previousSales
                  .slice(0, 10)
                  .map((sale, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-4 text-[#CFCAA3]"
                    >
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">{sale.event}</div>
                        <div className="text-base font-normal opacity-80">{sale.date}</div>
                      </div>
                      <div className="text-lg font-normal self-center">
                        {sale.discount === 0 ? "Unknown Discount" : `${sale.discount}% off`}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <p className="text-[#CFCAA3] text-sm italic p-8 text-center">
        *Please note that this is a suggestion only. Predictions may be incorrect due to limited data and imperfect prediction models.
      </p>
      <Footer />
    </div>
  )
}

