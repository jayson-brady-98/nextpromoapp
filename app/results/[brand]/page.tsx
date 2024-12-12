import { fetchPredictions } from '@/lib/api/prediction'
import { getPredictionLabel } from '@/lib/api/predictionLabel'
import { fetchPreviousSales } from '@/lib/api/previousSales'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Search, Calendar} from 'lucide-react'

type BrandParams = Promise<{ brand: string }>

type SalePost = {
  sale_date: string;
  event: string;
  discount: string;
  sale_discount: string;
}

function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  // Format options for dates
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  }

  // If dates are the same, return single date
  if (startDate === endDate) {
    return start.toLocaleDateString('en-US', options)
  }
  
  // If different dates, return range
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
}

export default async function ResultsPage(props: { params: BrandParams }) {
  const params = await props.params
  
  // Try to get stored data first if coming from advertisement page
  let brandData
  if (typeof window !== 'undefined') {
    const storedData = sessionStorage.getItem('brandData')
    if (storedData) {
      brandData = JSON.parse(storedData)
      sessionStorage.removeItem('brandData') // Clear after use
    }
  }
  
  // If no stored data, fetch it
  if (!brandData) {
    brandData = await fetchPredictions(params.brand.toLowerCase())
  }
  
  const previousSales = await fetchPreviousSales(params.brand.toLowerCase())

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

  // Transform the necessary data
  const formattedData = {
    name: brandData.brand_name.replace(/\b\w/g, (c: string) => c.toUpperCase()),
    nextSale: {
      date: formatDateRange(brandData.sale_start_date, brandData.sale_end_date),
      probability: Math.round(brandData.yhat * 100),
      event: brandData.event
    }
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
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div>
                  <h2 className="text-4xl font-bold text-[#E4434B]">Next {formattedData.name} Sale:</h2>
                  <p className="text-[#CFCAA3] text-sm italic mt-0">
                    Powered by coffee and discontent
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-14 h-14 text-[#b39a55]" />
                  <div>
                    <div className="flex flex-col">
                      <p className="text-3xl font-bold text-[#b39a55] leading-none mb-1">{formattedData.nextSale.date}*</p>
                      <p className="text-[#CFCAA3] text-lg">
                        {formattedData.nextSale.event === "unknown" ? "Unknown sale event" : formattedData.nextSale.event}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <p className="inline-block bg-[#BDCEDA] px-2 py-0.5 rounded-md text-[#445B6C] text-xs font-semibold">
                        {getPredictionLabel(brandData.yhat)}
                      </p>
                      {brandData.sitewide === 1 && (
                        <p className="inline-block bg-[#BDCEDA] px-2 py-0.5 rounded-md text-[#445B6C] text-xs font-semibold">
                          Sitewide
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6 text-[#E4434B]">Previous {formattedData.name} Sales</h2>
              <div className="divide-y divide-[#b39a55]">
                {(() => {
                  console.log('Raw previous sales:', previousSales);
                  const reducedSales = previousSales
                    .reduce((unique: SalePost[], post: SalePost) => {
                      // Convert current post date
                      const [day, month, year] = post.sale_date.split('-');
                      const currentDate = new Date(`${year}-${month}-${day}`);
                      
                      // Check if we already have a similar sale
                      const existingSale = unique.find(p => {
                        // Convert existing sale date
                        const [eDay, eMonth, eYear] = p.sale_date.split('-');
                        const existingDate = new Date(`${eYear}-${eMonth}-${eDay}`);
                        
                        // Calculate date difference in days
                        const diffTime = Math.abs(existingDate.getTime() - currentDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        // Only group sales if they're within 21 days AND have the same event name
                        // or if one of them has an unknown event name
                        return diffDays <= 21 && (
                          p.event === post.event || 
                          (p.event === "N/A" && post.event !== "N/A") ||
                          (post.event === "N/A" && p.event !== "N/A")
                        );
                      });
                      
                      if (!existingSale) {
                        unique.push({
                          ...post,
                          discount: post.sale_discount
                        });
                      } else {
                        // Update existing sale only if the new one has better information
                        if (post.event !== "N/A" && existingSale.event === "N/A") {
                          existingSale.event = post.event;
                        }
                        if (Number(post.sale_discount) > Number(existingSale.discount)) {
                          existingSale.discount = post.sale_discount;
                        }
                      }
                      return unique;
                    }, [] as SalePost[]);
                  
                  console.log('After reduction:', reducedSales);
                  
                  const sortedSales = reducedSales.sort((a: SalePost, b: SalePost) => {
                    const [dayA, monthA, yearA] = a.sale_date.split('-');
                    const [dayB, monthB, yearB] = b.sale_date.split('-');
                    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
                    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
                    return dateB.getTime() - dateA.getTime();
                  });
                  
                  console.log('After sorting:', sortedSales);
                  
                  return sortedSales.slice(0, 10).map((sale: SalePost) => (
                    <div
                      key={`${sale.sale_date}-${sale.event}`}
                      className="flex justify-between py-4 text-[#CFCAA3]"
                    >
                      <div className="flex flex-col">
                        <div className="text-lg font-semibold">
                          {sale.event === "N/A" ? "Flash sale" : sale.event}
                        </div>
                        <div className="text-base font-normal opacity-80">{sale.sale_date}</div>
                      </div>
                      <div className="text-lg font-normal self-center">
                        {sale.discount === "N/A" ? "Discount unknown" : `${sale.discount} off`}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </section>
        </div>
      </main>
      <p className="text-[#CFCAA3] text-sm italic p-8 text-center">
        *Predictions may be incorrect. User discretion is advised.
      </p>
      <Footer />
    </div>
  )
}

