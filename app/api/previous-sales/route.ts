import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const brandQuery = searchParams.get('brand')

  if (!brandQuery) {
    return NextResponse.json({ error: 'Brand query is required' }, { status: 400 })
  }

  try {
    const now = new Date()
    const currentDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
    
    const { data, error } = await supabase
      .from('previous_sales')
      .select('brand, event, sitewide, discount, start_date, end_date')
      .ilike('brand', `%${brandQuery}%`)
      .order('start_date', { ascending: false })

    console.log('Query parameters:', {
      brandQuery,
      decodedQuery: decodeURIComponent(brandQuery),
      currentDate
    })
    
    console.log('Query results:', data)

    if (error) throw error

    // Transform the data to match the expected format
    const transformedData = data?.map(sale => ({
      brand: sale.brand,
      event: sale.event,
      sitewide: sale.sitewide === 1, // Convert to boolean
      discount: sale.discount,
      start_date: sale.start_date,
      end_date: sale.end_date
    })) || []

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return NextResponse.json({ error: 'Failed to fetch previous sales' }, { status: 500 })
  }
}