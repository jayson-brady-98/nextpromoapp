'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScriptableContext
} from 'chart.js'
import { ChartOptions as ChartJSOptions } from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type SalesChartProps = {
  previousSales: Array<{
    brand: string;
    event: string;
    sitewide: boolean;
    discount: string;
    start_date: string;
    end_date: string;
  }>;
}

type DataPoint = {
  date: Date;
  discount: number;
};

// Add proper type for the options object
type ChartOptions = {
  scales: {
    y: {
      beginAtZero: boolean;
      max: number;
      grid: {
        display: boolean;
      };
      ticks: {
        color: string;
      };
      title: {
        display: boolean;
        text: string;
        color: string;
        font: {
          size: number;
          weight: number | string;
        };
      };
    };
    x: {
      type: 'category';
      grid: {
        display: boolean;
      };
      ticks: {
        color: string;
        maxRotation: number;
        minRotation: number;
        autoSkip: boolean;
        callback: (label: string, index: number) => string | '';
      };
    };
  };
  responsive: boolean;
  maintainAspectRatio: boolean;
  aspectRatio: number;
  plugins: {
    tooltip: {
      enabled: boolean;
      displayColors: boolean;
      titleDisplay: boolean;
      padding: number;
      bodySpacing: number;
      multiKeyBackground: string;
      callbacks: {
        title: () => string;
        label: (context: { dataIndex: number }) => string[];
      };
    };
    legend: {
      display: boolean;
    };
  };
}

// This helper interpolates between two color values [r,g,b]
function interpolateColor(
  ratio: number,
  minColor: [number, number, number],
  maxColor: [number, number, number]
) {
  const [r1, g1, b1] = minColor
  const [r2, g2, b2] = maxColor
  const r = Math.round(r1 + ratio * (r2 - r1))
  const g = Math.round(g1 + ratio * (g2 - g1))
  const b = Math.round(b1 + ratio * (b2 - b1))
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * getHeatColor(count)
 * - 1 sale → #FFDADA (pale pink)
 * - 2 sales → slightly darker than before
 * - 3 sales → another step closer
 * - 4 or more → #E4434B (the original bright red)
 */
function getHeatColor(count: number) {
  if (count >= 4) {
    return '#E4434B'
  }
  if (count <= 1) {
    return '#FFDADA'
  }

  // For 2 or 3, use piecewise logic so we can make 2 darker specifically
  if (count === 2) {
    // ratio ~ 0.6 (a bit darker than if it were purely linear from 1 to 4)
    return interpolateColor(0.6, [255, 218, 218], [228, 67, 75])
  }

  // Otherwise count === 3
  // ratio ~ 0.8
  return interpolateColor(0.8, [255, 218, 218], [228, 67, 75])
}

export function SalesChart({ previousSales }: SalesChartProps) {
  // Convert both start_date and end_date from DD/MM/YYYY → YYYY-MM-DD
  // so that Date parsing is correct in all environments
  const processedData = previousSales
    .map((sale) => {
      const [sDay, sMonth, sYear] = sale.start_date.split('/')
      const [eDay, eMonth, eYear] = sale.end_date.split('/')
      const date = new Date(`${sYear}-${sMonth}-${sDay}`)
      const endDate = new Date(`${eYear}-${eMonth}-${eDay}`)
      const discount = sale.discount ? parseInt(sale.discount.replace(/[^0-9]/g, ''), 10) : 0

      return {
        date,
        end_date: endDate,
        discount,
        event: sale.event,
        sitewide: sale.sitewide
      }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  // Aggregate sales by month
  const aggregatedData = processedData.reduce((acc, sale) => {
    const monthKey = sale.date.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit'
    })
    if (!acc[monthKey]) {
      acc[monthKey] = {
        sales: [],
        date: sale.date,
        totalDiscount: 0,
        count: 0
      }
    }
    acc[monthKey].sales.push(sale)
    acc[monthKey].totalDiscount += sale.discount
    acc[monthKey].count += 1
    return acc
  }, {} as Record<
    string,
    { sales: typeof processedData; date: Date; totalDiscount: number; count: number }
  >)

  const monthlyData = Object.entries(aggregatedData).map(([_, data]) => ({
    date: data.date,
    avgDiscount: Math.round(data.totalDiscount / data.count),
    count: data.count,
    sales: data.sales
  }))

  // Step 2: Create a full month range
  function createFullMonthRange(data: { date: Date }[]) {
    if (data.length === 0) return []
    const minTime = Math.min(...data.map((d) => d.date.getTime()))
    const maxTime = Math.max(...data.map((d) => d.date.getTime()))

    // Start at the very beginning of the earliest month
    const startDate = new Date(minTime)
    startDate.setDate(1)

    // End at the very end of the latest month
    const endDate = new Date(maxTime)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)

    const months: Date[] = []
    const current = new Date(startDate)
    while (current <= endDate) {
      months.push(new Date(current))
      current.setMonth(current.getMonth() + 1)
    }
    return months
  }

  const fullMonthRange = createFullMonthRange(monthlyData)

  // Step 3: Prepare chart data
  const chartData = {
    labels: fullMonthRange.map((d) =>
      d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    ),
    datasets: [
      {
        label: 'Average Discount',
        data: fullMonthRange.map((d) => {
          const found = monthlyData.find(
            (m) => m.date.getMonth() === d.getMonth() && m.date.getFullYear() === d.getFullYear()
          )
          return found ? found.avgDiscount : null
        }),
        backgroundColor: '#E4434B',
        showLine: true,
        tension: 0.4,
        fill: false,
        borderColor: '#34495E',
        borderWidth: 2,
        pointRadius: fullMonthRange.map((d) => {
          const found = monthlyData.find(
            (m) => m.date.getMonth() === d.getMonth() && m.date.getFullYear() === d.getFullYear()
          )
          if (!found) return 0
          if (found.count === 1) return 3
          const scaled = found.count * 2
          return Math.min(Math.max(5, scaled), 10)
        }),
        pointBackgroundColor: fullMonthRange.map((d) => {
          const found = monthlyData.find(
            (m) => m.date.getMonth() === d.getMonth() && m.date.getFullYear() === d.getFullYear()
          )
          if (!found) return 'rgba(0,0,0,0)'
          return getHeatColor(found.count)
        }),
        pointBorderColor: fullMonthRange.map((d) => {
          const found = monthlyData.find(
            (m) => m.date.getMonth() === d.getMonth() && m.date.getFullYear() === d.getFullYear()
          )
          if (!found) return 'rgba(0,0,0,0)'
          return getHeatColor(found.count)
        }),
        spanGaps: true
      }
    ]
  }

  const options: ChartJSOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false
        },
        ticks: {
          color: '#CFCAA3'
        },
        title: {
          display: true,
          text: 'Discount Amount (%)',
          color: '#CFCAA3',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      x: {
        type: 'category',
        grid: {
          display: false
        },
        ticks: {
          color: '#CFCAA3',
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
          callback: function (_, index: number) {
            const date = fullMonthRange[index]
            const month = date.getMonth()
            // Only show Jan (0), Apr (3), Jul (6), Oct (9)
            if ([0, 3, 6, 9].includes(month)) {
              return date.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })
            }
            return ''
          }
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        displayColors: false,
        titleFont: { size: 0 }, // Fixed: Removed invalid 'display' property
        padding: 12,
        bodySpacing: 4,
        multiKeyBackground: 'transparent',
        callbacks: {
          title: () => '',
          label: (context: { dataIndex: number }) => {
            // context.dataIndex matches our fullMonthRange index
            const date = fullMonthRange[context.dataIndex]
            const found = monthlyData.find(
              (m) =>
                m.date.getMonth() === date.getMonth() &&
                m.date.getFullYear() === date.getFullYear()
            )
            if (!found) {
              return ['No sales this month']
            }

            const labelLines: string[] = []
            found.sales.forEach((sale, idx) => {
              if (idx > 0) labelLines.push('───────────')
              labelLines.push(
                sale.event && sale.event !== 'N/A' && sale.event.trim() !== ''
                  ? sale.event
                  : sale.date.getTime() === sale.end_date.getTime()
                  ? "Flash Sale"
                  : "Generic Sale",
                `Sale dates: ${
                  sale.date.getTime() === sale.end_date.getTime()
                    ? sale.date.toLocaleDateString()
                    : `${sale.date.toLocaleDateString()} - ${sale.end_date.toLocaleDateString()}`
                }`,
                `Discount: ${sale.discount ? `${sale.discount}%` : 'Unknown'}`,
                sale.sitewide ? 'Sitewide' : ''
              )
            })
            return labelLines.filter(Boolean)
          }
        }
      },
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="w-full">
      <Line 
        data={chartData} 
        options={options}
      />
    </div>
  )
}