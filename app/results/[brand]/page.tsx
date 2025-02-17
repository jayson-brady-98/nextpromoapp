import { fetchPreviousSales } from '@/lib/api/previousSales'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { SalesChart } from '@/components/SalesChart'
import { CalendarIcon, SparklesIcon, BanknotesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { YearSalesToggle } from '@/components/YearSalesToggle'

export type Sale = {
  start_date: string;
  end_date: string;
  event: string;
  sitewide: boolean;
  discount: string;
  brand: string;
}

type BrandParams = Promise<{ brand: string }>
type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function ResultsPage(props: {
  params: BrandParams;
  searchParams: SearchParams;
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  
  const previousSales = await fetchPreviousSales(params.brand.toLowerCase())

  const sales: Sale[] = Array.isArray(previousSales) ? previousSales : []

  if (!previousSales || previousSales.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#182A39]">
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">
              Sorry, I haven't added &quot;{decodeURIComponent(params.brand).replace(/\b\w/g, (c) => c.toUpperCase())}&quot; yet
            </h1>
            <p className="text-xl mb-8">
              <a
                href="https://jmbrady.notion.site/15c9d40c313680ddb05fe3ea25234631?pvs=105"
                className="text-[#b39a55] hover:text-[#cfcaa3] transition-colors"
              >
                 Please fill out this form
              </a>{" "}
              and I&apos;ll add &quot;{decodeURIComponent(params.brand).replace(/\b\w/g, (c) => c.toUpperCase())}&quot; to the database asap :)
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

  const formattedData = {
    name: decodeURIComponent(params.brand).replace(/\b\w/g, (c: string) => c.toUpperCase())
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#182A39]">
      <main className="flex-grow">
        <div className="w-full max-w-4xl mx-auto p-4">
          <div className="mb-8 px-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              New search
            </Link>
          </div>

          <section>
            <div className="p-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div className="w-full">
                  <h1 className="text-4xl font-bold text-[#E4434B] text-center">
                    Previous {formattedData.name} Sales
                  </h1>
                  <h2 className="text-sm text-center text-[#CFCAA3] mt-1">Based on available data</h2>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4">
            <div className="p-4">
              <div className="bg-white/5 p-6 rounded-lg h-[400px] md:h-[500px] w-full overflow-x-auto">
                <div className="min-w-[600px]">
                  {!Array.isArray(previousSales) ? (
                    <div className="text-[#CFCAA3]">No previous sales data available</div>
                  ) : (
                    <SalesChart previousSales={previousSales} />
                  )}
                </div>
              </div>
              <p className="text-sm text-center text-[#CFCAA3] mt-2">
                Note: Dates are formatted as DD/MM/YYYY
              </p>
            </div>
          </section>

          {/* New Sale Frequency Section */}
          <section className="mt-4">
            <div className="p-4">
              <div className="bg-white/5 p-6 rounded-lg">
                {Array.isArray(previousSales) && (
                  <>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
                      {/* Icon on the left */}
                      {(() => {
                        const recentSales = sales.filter((sale) => {
                          const year = parseInt(sale.start_date.split('/')[2])
                          return year >= 2022
                        })
                        const salesPerYear = recentSales.length / 2

                        if (salesPerYear >= 8) {
                          return <BanknotesIcon className="w-16 h-16 text-green-500" />
                        } else if (salesPerYear >= 4) {
                          return <ShoppingBagIcon className="w-16 h-16 text-pink-500" />
                        } else if (salesPerYear >= 1) {
                          return <CalendarIcon className="w-16 h-16 text-[#CFCAA3]" />
                        } else {
                          return <SparklesIcon className="w-16 h-16 text-yellow-400" />
                        }
                      })()}

                      {/* Text content on the right, but still centered */}
                      <div className="text-center space-y-2 max-w-xl">
                        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                          <h2 className="text-xl sm:text-2xl font-bold text-[#E4434B]">
                            Sale Frequency:
                          </h2>
                          <span className="text-xl sm:text-2xl font-bold text-[#CFCAA3]">
                            {(() => {
                              const recentSales = sales.filter((sale) => {
                                const year = parseInt(sale.start_date.split('/')[2])
                                return year >= 2022
                              })
                              const salesPerYear = recentSales.length / 2

                              if (salesPerYear >= 8) return 'High-Frequency'
                              if (salesPerYear >= 4) return 'Moderate-Frequency'
                              if (salesPerYear >= 1) return 'Low-Frequency'
                              return 'Rare'
                            })()}
                          </span>
                        </div>
                        <div className="text-[#CFCAA3]/80">
                          {(() => {
                            const recentSales = sales.filter((sale) => {
                              const year = parseInt(sale.start_date.split('/')[2])
                              return year >= 2022
                            })
                            const salesPerYear = recentSales.length / 2

                            if (salesPerYear >= 8) {
                              return `${formattedData.name} offers discounts frequently throughout the year`
                            } else if (salesPerYear >= 4) {
                              return `${formattedData.name} offers discounts a few times a year`
                            } else if (salesPerYear >= 1) {
                              return `${formattedData.name} offers discounts once or twice a year`
                            } else {
                              return `${formattedData.name} offers discounts once in a blue moon`
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="p-8">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,max-content))] gap-6">
                {Object.entries(
                  sales
                    .sort((a, b) => {
                      const [dayA, monthA, yearA] = a.start_date.split('/');
                      const [dayB, monthB, yearB] = b.start_date.split('/');
                      const dateA = new Date(Number(yearA), Number(monthA) - 1, Number(dayA));
                      const dateB = new Date(Number(yearB), Number(monthB) - 1, Number(dayB));
                      return dateB.getTime() - dateA.getTime();
                    })
                    .reduce((groups: Record<string, Sale[]>, sale) => {
                      const year = sale.start_date.split('/')[2];
                      if (!groups[year]) groups[year] = [];
                      groups[year].push(sale);
                      return groups;
                    }, {})
                ).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
                  .map(([year, yearSales]) => (
                    <YearSalesToggle key={year} year={year} yearSales={yearSales} />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

