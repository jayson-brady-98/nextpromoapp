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
    // 1. Split the query into words
    const searchWords = brandQuery.toLowerCase().trim().split(/\s+/)

    // 2. Start a Supabase query
    let supabaseQuery = supabase
      .from('previous_sales')
      .select('brand, event, sitewide, discount, start_date, end_date')

    // 3. For each word, chain an .ilike condition
    //    By default, multiple .ilike() calls are combined with logical AND
    searchWords.forEach(word => {
      supabaseQuery = supabaseQuery.ilike('brand', `%${word}%`)
    })

    // 4. Finally, order the result
    supabaseQuery = supabaseQuery.order('start_date', { ascending: false })

    // 5. Execute the query
    const { data, error } = await supabaseQuery
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

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching previous sales:', error)
    return NextResponse.json({ error: 'Failed to fetch previous sales' }, { status: 500 })
  }
}