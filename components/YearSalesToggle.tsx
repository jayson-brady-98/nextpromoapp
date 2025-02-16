'use client'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Sale } from '@/app/results/[brand]/page'

type YearSalesToggleProps = {
  year: string
  yearSales: Sale[]
}

export function YearSalesToggle({ year, yearSales }: YearSalesToggleProps) {
  return (
    <>
      <div className="inline-block">
        <button 
          onClick={() => {
            const element = document.getElementById(`year-${year}`);
            if (element) {
              element.classList.toggle('hidden');
            }
            const chevron = document.getElementById(`chevron-${year}`);
            if (chevron) {
              chevron.classList.toggle('rotate-180');
            }
          }}
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-3xl text-[#E4434B] font-bold">
            {year}
          </span>
          <ChevronDownIcon 
            id={`chevron-${year}`}
            className="w-6 h-6 text-[#E4434B] transition-transform duration-200" 
          />
        </button>
      </div>
      <div id={`year-${year}`} className="hidden col-span-full w-full mt-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {yearSales.map((sale: Sale, index) => (
            <div key={index} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-0.5">
                <div>
                  <div className="text-[#CFCAA3] text-lg">
                    {sale.event && sale.event !== 'N/A' && sale.event.trim() !== ''
                      ? sale.event
                      : sale.start_date === sale.end_date
                      ? "Flash Sale"
                      : "Generic Sale"}
                  </div>
                  <div className="text-[#CFCAA3]/60 text-base">
                    {sale.start_date === sale.end_date
                      ? sale.start_date
                      : `${sale.start_date} - ${sale.end_date}`}
                  </div>
                  {sale.sitewide && (
                    <div className="text-[#CFCAA3]/60 text-sm mt-1">
                      Sitewide
                    </div>
                  )}
                </div>
                <div className="text-[#CFCAA3] text-lg mt-2 sm:mt-0 sm:ml-4">
                  {sale.discount || "Discount unknown"}
                </div>
              </div>
              <div className="h-px bg-[#CFCAA3]/10 mt-3" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}