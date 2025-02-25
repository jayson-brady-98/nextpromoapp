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
    const searchTerm = brandQuery.toLowerCase().trim()
    console.log('Searching for brand:', searchTerm)

    const { data, error } = await supabase
      .from("previous_sales")
      .select("brand, event, sitewide, discount, start_date, end_date")
      .ilike("brand", `%${searchTerm}%`)
      .order("start_date", { ascending: false })

    console.log('Supabase response:', { data, error })

    if (error) throw error

    // 6. Transform if needed
    const transformedData = data?.map(sale => ({
      brand: sale.brand,
      event: sale.event,
      sitewide: sale.sitewide === 1,
      discount: sale.discount,
      start_date: sale.start_date,
      end_date: sale.end_date
    })) || []

    console.log('Transformed data:', transformedData)

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return NextResponse.json({ error: 'Failed to fetch previous sales' }, { status: 500 })
  }
}